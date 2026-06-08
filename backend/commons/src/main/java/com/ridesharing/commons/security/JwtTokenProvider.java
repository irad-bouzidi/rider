package com.ridesharing.commons.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {

    private final SecretKey accessSecret;
    private final SecretKey refreshSecret;
    private final long accessTokenExpiration;
    private final long refreshTokenExpiration;

    public JwtTokenProvider(
            @Value("${jwt.access-secret}") String accessSecret,
            @Value("${jwt.refresh-secret}") String refreshSecret,
            @Value("${jwt.access-token-expiration:900}") long accessTokenExpiration,
            @Value("${jwt.refresh-token-expiration:604800}") long refreshTokenExpiration
    ) {
        this.accessSecret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(accessSecret));
        this.refreshSecret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(refreshSecret));
        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

    public String generateAccessToken(UUID userId, String role) {
        Date now = new Date();
        return Jwts.builder()
                .subject(userId.toString())
                .claim("role", role)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + accessTokenExpiration * 1000))
                .issuer("ridesharing")
                .audience().add("ridesharing-api").and()
                .id(UUID.randomUUID().toString())
                .signWith(accessSecret)
                .compact();
    }

    public String generateRefreshToken(UUID userId) {
        Date now = new Date();
        return Jwts.builder()
                .subject(userId.toString())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + refreshTokenExpiration * 1000))
                .issuer("ridesharing")
                .signWith(refreshSecret)
                .compact();
    }

    public Claims validateAccessToken(String token) {
        return Jwts.parser()
                .verifyWith(accessSecret)
                .requireAudience("ridesharing-api")
                .requireIssuer("ridesharing")
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Claims validateRefreshToken(String token) {
        return Jwts.parser()
                .verifyWith(refreshSecret)
                .requireIssuer("ridesharing")
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public UUID getUserIdFromToken(String token) {
        return UUID.fromString(validateAccessToken(token).getSubject());
    }

    public String getRoleFromToken(String token) {
        return validateAccessToken(token).get("role", String.class);
    }

    public long getAccessTokenExpiration() {
        return accessTokenExpiration;
    }
}
