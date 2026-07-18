package com.ridesharing.payment.controller;

import com.ridesharing.commons.dto.ApiResponse;
import com.ridesharing.payment.model.Transaction;
import com.ridesharing.payment.model.Wallet;
import com.ridesharing.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping("/wallet")
    public ResponseEntity<ApiResponse<Wallet>> getWallet(@AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(ApiResponse.ok(paymentService.getOrCreateWallet(userId)));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<Page<Transaction>>> getHistory(
            @AuthenticationPrincipal UUID userId,
            Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.ok(paymentService.getTransactionHistory(userId, pageable)));
    }

    @PostMapping("/wallet/topup")
    public ResponseEntity<ApiResponse<Wallet>> topUp(
            @AuthenticationPrincipal UUID userId,
            @RequestBody Map<String, Object> body
    ) {
        var amount = BigDecimal.valueOf(Double.parseDouble(body.get("amount").toString()));
        paymentService.processWalletPayment(userId, amount.negate());
        // For topup, we credit instead
        var wallet = paymentService.getOrCreateWallet(userId);
        return ResponseEntity.ok(ApiResponse.ok(wallet));
    }
}
