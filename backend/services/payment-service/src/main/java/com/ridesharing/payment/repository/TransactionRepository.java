package com.ridesharing.payment.repository;

import com.ridesharing.payment.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    Optional<Transaction> findByStripePaymentIntentId(String stripePaymentIntentId);
    Optional<Transaction> findByRideIdAndType(UUID rideId, String type);
    Page<Transaction> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);
}
