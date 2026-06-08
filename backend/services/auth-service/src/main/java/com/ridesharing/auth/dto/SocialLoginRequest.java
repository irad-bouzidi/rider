package com.ridesharing.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialLoginRequest {
    @NotBlank(message = "Provider is required")
    private String provider;

    @NotBlank(message = "ID token is required")
    private String idToken;

    private String email;
    private String fullName;
    private String deviceId;
    private String fcmToken;
}
