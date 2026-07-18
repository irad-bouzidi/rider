package com.ridesharing.ride.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideResponse {
    private UUID rideId;
    private UUID passengerId;
    private UUID driverId;
    private String rideType;
    private String status;

    private Double pickupLatitude;
    private Double pickupLongitude;
    private String pickupAddress;
    private Double destLatitude;
    private Double destLongitude;
    private String destAddress;

    private BigDecimal estimatedDistance;
    private Integer estimatedDuration;
    private BigDecimal actualDistance;
    private Integer actualDuration;

    private BigDecimal baseFare;
    private BigDecimal distanceCharge;
    private BigDecimal timeCharge;
    private BigDecimal surgeMultiplier;
    private BigDecimal promoDiscount;
    private BigDecimal totalFare;
    private String currency;
    private String paymentStatus;

    private Instant requestedAt;
    private Instant acceptedAt;
    private Instant arrivedAt;
    private Instant startedAt;
    private Instant completedAt;
    private Instant cancelledAt;

    private Integer estimatedDriverArrival;
}
