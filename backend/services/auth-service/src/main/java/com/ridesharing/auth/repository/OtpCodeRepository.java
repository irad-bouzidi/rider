package com.ridesharing.auth.repository;

import com.ridesharing.auth.model.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OtpCodeRepository extends JpaRepository<OtpCode, UUID> {
    Optional<OtpCode> findTopByPhoneAndPurposeAndVerifiedFalseOrderByCreatedAtDesc(String phone, String purpose);
    void deleteAllByExpiresAtBefore(Instant now);
}
