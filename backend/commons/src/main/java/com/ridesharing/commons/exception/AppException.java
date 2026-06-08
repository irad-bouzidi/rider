package com.ridesharing.commons.exception;

import lombok.Getter;

@Getter
public class AppException extends RuntimeException {
    private final String code;
    private final int status;

    public AppException(String code, String message, int status) {
        super(message);
        this.code = code;
        this.status = status;
    }

    public AppException(String code, String message, int status, Throwable cause) {
        super(message, cause);
        this.code = code;
        this.status = status;
    }

    public static AppException notFound(String resource, Object id) {
        return new AppException(
                resource.toUpperCase() + "_NOT_FOUND",
                resource + " not found with id: " + id,
                404
        );
    }

    public static AppException badRequest(String code, String message) {
        return new AppException(code, message, 400);
    }

    public static AppException conflict(String code, String message) {
        return new AppException(code, message, 409);
    }

    public static AppException unauthorized(String message) {
        return new AppException("UNAUTHORIZED", message, 401);
    }

    public static AppException forbidden(String message) {
        return new AppException("FORBIDDEN", message, 403);
    }
}
