package com.ridesharing.payment.service;

import com.ridesharing.commons.exception.AppException;
import com.ridesharing.payment.model.Transaction;
import com.ridesharing.payment.model.Wallet;
import com.ridesharing.payment.repository.TransactionRepository;
import com.ridesharing.payment.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;

    @Value("${stripe.secret-key:sk_test_placeholder}")
    private String stripeSecretKey;

    @Transactional
    public Transaction processRidePayment(UUID rideId, UUID userId, BigDecimal amount, String paymentMethod) {
        var txn = Transaction.builder()
                .userId(userId)
                .rideId(rideId)
                .type("ride_payment")
                .amount(amount)
                .status("processing")
                .description("Payment for ride " + rideId)
                .build();

        try {
            if ("wallet".equals(paymentMethod)) {
                processWalletPayment(userId, amount);
            } else {
                processStripePayment(txn, userId, amount);
            }
            txn.setStatus("completed");
        } catch (Exception e) {
            txn.setStatus("failed");
            log.error("Payment failed for rideId={}: {}", rideId, e.getMessage());
            throw AppException.badRequest("PAYMENT_FAILED", "Payment processing failed: " + e.getMessage());
        }

        return transactionRepository.save(txn);
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void processWalletPayment(UUID userId, BigDecimal amount) {
        var wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> AppException.notFound("Wallet", userId));

        if (wallet.getBalance().compareTo(amount) < 0) {
            throw AppException.badRequest("INSUFFICIENT_BALANCE",
                    "Insufficient wallet balance. Required: " + amount + ", Available: " + wallet.getBalance());
        }

        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);
    }

    @Transactional
    public void processStripePayment(Transaction txn, UUID userId, BigDecimal amount) {
        if ("sk_test_placeholder".equals(stripeSecretKey)) {
            log.info("[MOCK STRIPE] Charging ${} for user {}", amount, userId);
            txn.setStripePaymentIntentId("pi_mock_" + UUID.randomUUID());
            return;
        }
        try {
            var params = new com.stripe.param.PaymentIntentCreateParams.Builder()
                    .setAmount(amount.multiply(BigDecimal.valueOf(100)).longValue())
                    .setCurrency("usd")
                    .setAutomaticPaymentMethods(
                            com.stripe.param.PaymentIntentCreateParams
                                    .AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .build();
            var intent = com.stripe.PaymentIntent.create(params);
            txn.setStripePaymentIntentId(intent.getId());
        } catch (Exception e) {
            throw new RuntimeException("Stripe payment failed: " + e.getMessage(), e);
        }
    }

    @Transactional
    public Wallet getOrCreateWallet(UUID userId) {
        return walletRepository.findByUserId(userId)
                .orElseGet(() -> walletRepository.save(
                        Wallet.builder().userId(userId).build()
                ));
    }

    public Page<Transaction> getTransactionHistory(UUID userId, Pageable pageable) {
        return transactionRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
    }
}
