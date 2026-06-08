package com.ridesharing.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private UUID userId;
    private String fullName;
    private String email;
    private String role;
    private String accessToken;
    private String refreshToken;
    private long expiresIn;
    private String tokenType;

    public static AuthResponse of(UUID userId, String fullName, String email, String role,
                                  String accessToken, String refreshToken, long expiresIn) {
        return AuthResponse.builder()
                .userId(userId)
                .fullName(fullName)
                .email(email)
                .role(role)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(expiresIn)
                .tokenType("Bearer")
                .build();
    }
}
