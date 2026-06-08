package com.ridesharing.commons.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private boolean success;
    private ErrorDetail error;
    private Instant timestamp;
    private String path;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ErrorDetail {
        private String code;
        private String message;
        private Map<String, String> details;
        private int status;
    }

    public static ErrorResponse of(String code, String message, int status, String path) {
        return ErrorResponse.builder()
                .success(false)
                .error(ErrorDetail.builder()
                        .code(code)
                        .message(message)
                        .status(status)
                        .build())
                .timestamp(Instant.now())
                .path(path)
                .build();
    }

    public static ErrorResponse of(String code, String message, Map<String, String> details, int status, String path) {
        return ErrorResponse.builder()
                .success(false)
                .error(ErrorDetail.builder()
                        .code(code)
                        .message(message)
                        .details(details)
                        .status(status)
                        .build())
                .timestamp(Instant.now())
                .path(path)
                .build();
    }
}
