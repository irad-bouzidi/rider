package com.ridesharing.ride.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "rides", indexes = {
        @Index(name = "idx_rides_passenger_status", columnList = "passengerId, status"),
        @Index(name = "idx_rides_driver_status", columnList = "driverId, status"),
        @Index(name = "idx_rides_created", columnList = "createdAt DESC"),
        @Index(name = "idx_rides_status", columnList = "status")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "passenger_id", nullable = false)
    private UUID passengerId;

    @Column(name = "driver_id")
    private UUID driverId;

    @Column(name = "vehicle_id")
    private UUID vehicleId;

    @Column(name = "ride_type", length = 20, nullable = false)
    private String rideType;

    @Column(length = 20, nullable = false)
    @Builder.Default
    private String status = "requested";

    @Column(name = "pickup_latitude", nullable = false)
    private Double pickupLatitude;

    @Column(name = "pickup_longitude", nullable = false)
    private Double pickupLongitude;

    @Column(name = "pickup_address", columnDefinition = "TEXT", nullable = false)
    private String pickupAddress;

    @Column(name = "pickup_place_id", length = 255)
    private String pickupPlaceId;

    @Column(name = "dest_latitude")
    private Double destLatitude;

    @Column(name = "dest_longitude")
    private Double destLongitude;

    @Column(name = "dest_address", columnDefinition = "TEXT")
    private String destAddress;

    @Column(name = "dest_place_id", length = 255)
    private String destPlaceId;

    @Column(name = "estimated_distance", precision = 10, scale = 2)
    private BigDecimal estimatedDistance;

    @Column(name = "estimated_duration")
    private Integer estimatedDuration;

    @Column(name = "actual_distance", precision = 10, scale = 2)
    private BigDecimal actualDistance;

    @Column(name = "actual_duration")
    private Integer actualDuration;

    @Column(name = "route_polyline", columnDefinition = "TEXT")
    private String routePolyline;

    @Column(name = "base_fare", precision = 10, scale = 2)
    private BigDecimal baseFare;

    @Column(name = "distance_charge", precision = 10, scale = 2)
    private BigDecimal distanceCharge;

    @Column(name = "time_charge", precision = 10, scale = 2)
    private BigDecimal timeCharge;

    @Column(name = "surge_multiplier", precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal surgeMultiplier = BigDecimal.ONE;

    @Column(name = "promo_discount", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal promoDiscount = BigDecimal.ZERO;

    @Column(name = "total_fare", precision = 10, scale = 2)
    private BigDecimal totalFare;

    @Column(length = 3)
    @Builder.Default
    private String currency = "USD";

    @Column(name = "payment_method", length = 20)
    private String paymentMethod;

    @Column(name = "payment_status", length = 20)
    @Builder.Default
    private String paymentStatus = "pending";

    @Column(name = "requested_at", nullable = false)
    @Builder.Default
    private Instant requestedAt = Instant.now();

    @Column(name = "accepted_at")
    private Instant acceptedAt;

    @Column(name = "arrived_at")
    private Instant arrivedAt;

    @Column(name = "started_at")
    private Instant startedAt;

    @Column(name = "completed_at")
    private Instant completedAt;

    @Column(name = "cancelled_at")
    private Instant cancelledAt;

    @Column(name = "cancellation_reason", length = 100)
    private String cancellationReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    @Builder.Default
    private Instant updatedAt = Instant.now();

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}
