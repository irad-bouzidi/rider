package com.ridesharing.auth.service;

import com.ridesharing.auth.dto.*;
import com.ridesharing.auth.model.OtpCode;
import com.ridesharing.auth.model.RefreshToken;
import com.ridesharing.auth.model.User;
import com.ridesharing.auth.repository.OtpCodeRepository;
import com.ridesharing.auth.repository.RefreshTokenRepository;
import com.ridesharing.auth.repository.UserRepository;
import com.ridesharing.commons.exception.AppException;
import com.ridesharing.commons.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HexFormat;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final OtpCodeRepository otpCodeRepository;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int LOCK_DURATION_MINUTES = 15;
    private static final int MAX_REFRESH_TOKENS_PER_USER = 5;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw AppException.conflict("EMAIL_EXISTS", "Email already registered");
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw AppException.conflict("PHONE_EXISTS", "Phone already registered");
        }

        var user = User.builder()
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .authProvider("email")
                .role("passenger")
                .status("active")
                .build();

        user = userRepository.save(user);
        log.info("User registered: id={}, email={}", user.getId(), user.getEmail());

        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse registerDriver(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw AppException.conflict("EMAIL_EXISTS", "Email already registered");
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw AppException.conflict("PHONE_EXISTS", "Phone already registered");
        }

        var user = User.builder()
                .email(request.getEmail())
                .phone(request.getPhone())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .authProvider("email")
                .role("driver")
                .status("active")
                .build();

        user = userRepository.save(user);
        log.info("Driver registered: id={}, email={}", user.getId(), user.getEmail());

        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = Optional.empty();

        if (request.getEmail() != null) {
            userOpt = userRepository.findByEmail(request.getEmail());
        } else if (request.getPhone() != null) {
            userOpt = userRepository.findByPhone(request.getPhone());
        }

        var user = userOpt.orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        checkAccountLocked(user);

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            handleFailedLogin(user);
            throw new BadCredentialsException("Invalid credentials");
        }

        user.setFailedAttempts(0);
        user.setLastLoginAt(Instant.now());
        userRepository.save(user);

        log.info("User logged in: id={}", user.getId());
        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse socialLogin(String provider, String idToken, String email, String name) {
        Optional<User> existingUser = userRepository.findBySocialId(idToken);

        var user = existingUser.orElseGet(() -> {
            var newUser = User.builder()
                    .email(email)
                    .authProvider(provider)
                    .socialId(idToken)
                    .role("passenger")
                    .status("active")
                    .emailVerified(true)
                    .build();
            return userRepository.save(newUser);
        });

        user.setLastLoginAt(Instant.now());
        userRepository.save(user);

        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        var claims = tokenProvider.validateRefreshToken(request.getRefreshToken());
        UUID userId = UUID.fromString(claims.getSubject());

        String tokenHash = hashToken(request.getRefreshToken());
        var storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> AppException.unauthorized("Invalid refresh token"));

        if (storedToken.isRevoked() || storedToken.getExpiresAt().isBefore(Instant.now())) {
            throw AppException.unauthorized("Refresh token expired or revoked");
        }

        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        var user = userRepository.findById(userId)
                .orElseThrow(() -> AppException.notFound("User", userId));

        return generateAuthResponse(user);
    }

    @Transactional
    public void logout(String refreshToken, String deviceId) {
        if (refreshToken != null) {
            String tokenHash = hashToken(refreshToken);
            refreshTokenRepository.findByTokenHash(tokenHash)
                    .ifPresent(token -> {
                        token.setRevoked(true);
                        refreshTokenRepository.save(token);
                    });
        }
    }

    private AuthResponse generateAuthResponse(User user) {
        String accessToken = tokenProvider.generateAccessToken(user.getId(), user.getRole());
        String refreshToken = tokenProvider.generateRefreshToken(user.getId());
        String refreshTokenHash = hashToken(refreshToken);

        cleanExpiredTokens(user.getId());

        if (countActiveTokens(user.getId()) >= MAX_REFRESH_TOKENS_PER_USER) {
            refreshTokenRepository.deleteByUserId(user.getId());
        }

        refreshTokenRepository.save(RefreshToken.builder()
                .userId(user.getId())
                .tokenHash(refreshTokenHash)
                .expiresAt(Instant.now().plus(7, ChronoUnit.DAYS))
                .build());

        return AuthResponse.of(
                user.getId(), "", user.getEmail(),
                user.getRole(), accessToken, refreshToken,
                tokenProvider.getAccessTokenExpiration()
        );
    }

    private void checkAccountLocked(User user) {
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(Instant.now())) {
            throw AppException.unauthorized("Account is locked. Try again later.");
        }
        if (user.getLockedUntil() != null && user.getLockedUntil().isBefore(Instant.now())) {
            user.setFailedAttempts(0);
            user.setLockedUntil(null);
            userRepository.save(user);
        }
    }

    private void handleFailedLogin(User user) {
        user.setFailedAttempts(user.getFailedAttempts() + 1);
        if (user.getFailedAttempts() >= MAX_FAILED_ATTEMPTS) {
            user.setLockedUntil(Instant.now().plus(LOCK_DURATION_MINUTES, ChronoUnit.MINUTES));
        }
        userRepository.save(user);
    }

    private String hashToken(String token) {
        try {
            var digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes());
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            throw new RuntimeException("Failed to hash token", e);
        }
    }

    private long countActiveTokens(UUID userId) {
        return refreshTokenRepository.countByUserIdAndRevokedFalse(userId);
    }

    private void cleanExpiredTokens(UUID userId) {
        refreshTokenRepository.deleteAllByExpiresAtBefore(Instant.now());
    }
}
