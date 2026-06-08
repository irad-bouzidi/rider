package com.ridesharing.auth.service;

import com.ridesharing.auth.model.OtpCode;
import com.ridesharing.auth.repository.OtpCodeRepository;
import com.ridesharing.commons.exception.AppException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpCodeRepository otpCodeRepository;

    @Value("${twilio.account-sid:test}")
    private String twilioAccountSid;

    private static final int OTP_EXPIRY_MINUTES = 5;
    private static final int MAX_OTP_ATTEMPTS = 5;
    private static final int OTP_RESEND_COOLDOWN_SECONDS = 30;

    @Transactional
    public OtpSendResult sendOtp(String phone, String purpose) {
        var recentOtp = otpCodeRepository
                .findTopByPhoneAndPurposeAndVerifiedFalseOrderByCreatedAtDesc(phone, purpose);

        if (recentOtp.isPresent()) {
            long secondsSinceLast = ChronoUnit.SECONDS.between(
                    recentOtp.get().getCreatedAt(), Instant.now());
            if (secondsSinceLast < OTP_RESEND_COOLDOWN_SECONDS) {
                long waitTime = OTP_RESEND_COOLDOWN_SECONDS - secondsSinceLast;
                throw AppException.badRequest("OTP_COOLDOWN",
                        "Please wait " + waitTime + " seconds before requesting a new OTP");
            }
        }

        String code = generateOtpCode();

        var otpCode = OtpCode.builder()
                .phone(phone)
                .code(code)
                .purpose(purpose)
                .expiresAt(Instant.now().plus(OTP_EXPIRY_MINUTES, ChronoUnit.MINUTES))
                .build();

        otpCode = otpCodeRepository.save(otpCode);

        sendSms(phone, "Your RideSharing verification code is: " + code);
        log.info("OTP sent to {} for purpose: {}", phone, purpose);

        return new OtpSendResult(otpCode.getId(), OTP_EXPIRY_MINUTES * 60);
    }

    @Transactional
    public boolean verifyOtp(String otpId, String code) {
        var otpCode = otpCodeRepository.findById(java.util.UUID.fromString(otpId))
                .orElseThrow(() -> AppException.badRequest("INVALID_OTP", "Invalid OTP ID"));

        if (otpCode.isVerified()) {
            throw AppException.badRequest("OTP_ALREADY_VERIFIED", "OTP already verified");
        }

        if (otpCode.getExpiresAt().isBefore(Instant.now())) {
            throw AppException.badRequest("OTP_EXPIRED", "OTP has expired");
        }

        if (otpCode.getAttempts() >= MAX_OTP_ATTEMPTS) {
            throw AppException.badRequest("OTP_MAX_ATTEMPTS", "Maximum OTP attempts exceeded");
        }

        otpCode.setAttempts(otpCode.getAttempts() + 1);

        if (otpCode.getCode().equals(code)) {
            otpCode.setVerified(true);
            otpCodeRepository.save(otpCode);
            return true;
        }

        otpCodeRepository.save(otpCode);
        return false;
    }

    private String generateOtpCode() {
        var random = new SecureRandom();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }

    private void sendSms(String phone, String message) {
        if ("test".equals(twilioAccountSid)) {
            log.info("[MOCK SMS] To: {}, Message: {}", phone, message);
            return;
        }
        try {
            com.twilio.http.TwilioRestClient client = new com.twilio.http.TwilioRestClient
                    .Builder(twilioAccountSid, "")
                    .build();
        } catch (Exception e) {
            log.error("Failed to send SMS to {}: {}", phone, e.getMessage());
        }
    }

    public record OtpSendResult(java.util.UUID otpId, int expiresInSeconds) {}
}
