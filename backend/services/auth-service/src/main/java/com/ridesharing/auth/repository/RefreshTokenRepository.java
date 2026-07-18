package com.ridesharing.auth.repository;

import com.ridesharing.auth.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);
    void deleteByUserId(UUID userId);
    long countByUserIdAndRevokedFalse(UUID userId);
    void deleteAllByExpiresAtBefore(Instant now);
}
