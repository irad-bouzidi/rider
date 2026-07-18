package com.ridesharing.auth.controller;

import com.ridesharing.auth.dto.*;
import com.ridesharing.auth.service.AuthenticationService;
import com.ridesharing.auth.service.OtpService;
import com.ridesharing.commons.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authService;
    private final OtpService otpService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        var response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(response, "Registration successful"));
    }

    @PostMapping("/register/driver")
    public ResponseEntity<ApiResponse<AuthResponse>> registerDriver(@Valid @RequestBody RegisterRequest request) {
        var response = authService.registerDriver(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(response, "Driver registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        var response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/login/social")
    public ResponseEntity<ApiResponse<AuthResponse>> socialLogin(@Valid @RequestBody SocialLoginRequest request) {
        var response = authService.socialLogin(
                request.getProvider(),
                request.getIdToken(),
                request.getEmail(),
                request.getFullName()
        );
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/otp/send")
    public ResponseEntity<ApiResponse<Map<String, Object>>> sendOtp(@Valid @RequestBody OtpSendRequest request) {
        var result = otpService.sendOtp(request.getPhone(), request.getPurpose());
        var data = Map.of(
                "otpId", result.otpId(),
                "expiresInSeconds", result.expiresInSeconds()
        );
        return ResponseEntity.ok(ApiResponse.ok(data, "OTP sent successfully"));
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> verifyOtp(@Valid @RequestBody OtpVerifyRequest request) {
        boolean verified = otpService.verifyOtp(
                request.getOtpId().toString(),
                request.getCode()
        );
        return ResponseEntity.ok(ApiResponse.ok(
                Map.of("verified", verified),
                verified ? "OTP verified successfully" : "Invalid OTP code"
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        var response = authService.refreshToken(request);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestBody(required = false) Map<String, String> request,
            @RequestHeader("Authorization") String authHeader
    ) {
        String refreshToken = request != null ? request.get("refreshToken") : null;
        String deviceId = request != null ? request.get("deviceId") : null;
        authService.logout(refreshToken, deviceId);
        return ResponseEntity.ok(ApiResponse.ok(null, "Logged out successfully"));
    }
}
