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
public class LoginRequest {
    private String email;
    private String phone;

    @NotBlank(message = "Password is required")
    private String password;

    private String deviceId;
    private String fcmToken;
}
