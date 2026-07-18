package com.ridesharing.ride.service;

import com.ridesharing.commons.exception.AppException;
import com.ridesharing.ride.dto.*;
import com.ridesharing.ride.model.Ride;
import com.ridesharing.ride.model.RideStatusHistory;
import com.ridesharing.ride.repository.RideRepository;
import com.ridesharing.ride.repository.RideStatusHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class RideService {

    private final RideRepository rideRepository;
    private final RideStatusHistoryRepository statusHistoryRepository;
    private final RideEventPublisher eventPublisher;

    private static final Set<String> ACTIVE_STATUSES = Set.of("requested", "accepted", "driver_arrived", "in_progress");
    private static final BigDecimal ECONOMY_BASE_FARE = new BigDecimal("2.50");
    private static final BigDecimal ECONOMY_PER_KM = new BigDecimal("1.20");
    private static final BigDecimal ECONOMY_PER_MIN = new BigDecimal("0.20");
    private static final BigDecimal ECONOMY_MINIMUM = new BigDecimal("5.00");

    @Transactional
    public RideResponse requestRide(RideRequest request, UUID passengerId) {
        validateNoActiveRide(passengerId);

        var route = estimateRoute(request);
        var pricing = calculateFare(route.distanceKm(), route.durationMinutes(), request.getRideType(), BigDecimal.ONE);

        var ride = Ride.builder()
                .passengerId(passengerId)
                .rideType(request.getRideType())
                .status("requested")
                .pickupLatitude(request.getPickup().getLatitude())
                .pickupLongitude(request.getPickup().getLongitude())
                .pickupAddress(request.getPickup().getAddress())
                .pickupPlaceId(request.getPickup().getPlaceId())
                .destLatitude(request.getDestination().getLatitude())
                .destLongitude(request.getDestination().getLongitude())
                .destAddress(request.getDestination().getAddress())
                .destPlaceId(request.getDestination().getPlaceId())
                .estimatedDistance(route.distanceKm())
                .estimatedDuration(route.durationMinutes())
                .baseFare(pricing.baseFare())
                .distanceCharge(pricing.distanceCharge())
                .timeCharge(pricing.timeCharge())
                .surgeMultiplier(BigDecimal.ONE)
                .totalFare(pricing.total())
                .paymentMethod(request.getPaymentMethod())
                .build();

        ride = rideRepository.save(ride);
        saveStatusHistory(ride.getId(), null, "requested", "passenger", null);

        eventPublisher.publishRideRequested(ride);

        log.info("Ride requested: id={}, passengerId={}, fare={}",
                ride.getId(), passengerId, ride.getTotalFare());

        return RideResponse.builder()
                .rideId(ride.getId())
                .status(ride.getStatus())
                .estimatedFare(ride.getTotalFare())
                .currency(ride.getCurrency())
                .estimatedDriverArrival(route.durationMinutes())
                .requestedAt(ride.getRequestedAt())
                .build();
    }

    @Transactional
    public RideResponse acceptRide(UUID rideId, UUID driverId) {
        var ride = rideRepository.findById(rideId)
                .orElseThrow(() -> AppException.notFound("Ride", rideId));

        if (!"requested".equals(ride.getStatus())) {
            throw AppException.badRequest("INVALID_STATUS", "Ride cannot be accepted in current status: " + ride.getStatus());
        }

        ride.setDriverId(driverId);
        ride.setStatus("accepted");
        ride.setAcceptedAt(Instant.now());
        ride = rideRepository.save(ride);

        saveStatusHistory(ride.getId(), "requested", "accepted", "driver", null);
        eventPublisher.publishRideAccepted(ride);

        log.info("Ride accepted: id={}, driverId={}", rideId, driverId);
        return buildResponse(ride);
    }

    @Transactional
    public RideResponse updateStatus(UUID rideId, String newStatus, UUID actorId, String actor) {
        var ride = rideRepository.findById(rideId)
                .orElseThrow(() -> AppException.notFound("Ride", rideId));

        validateStatusTransition(ride.getStatus(), newStatus);

        String oldStatus = ride.getStatus();
        ride.setStatus(newStatus);

        switch (newStatus) {
            case "driver_arrived" -> ride.setArrivedAt(Instant.now());
            case "in_progress" -> ride.setStartedAt(Instant.now());
            case "completed" -> {
                ride.setCompletedAt(Instant.now());
                ride.setPaymentStatus("pending");
                eventPublisher.publishRideCompleted(ride);
            }
        }

        ride = rideRepository.save(ride);
        saveStatusHistory(ride.getId(), oldStatus, newStatus, actor, null);

        if ("completed".equals(newStatus)) {
            eventPublisher.publishRideCompleted(ride);
        }

        return buildResponse(ride);
    }

    @Transactional
    public RideResponse cancelRide(UUID rideId, UUID actorId, String actor, String reason) {
        var ride = rideRepository.findById(rideId)
                .orElseThrow(() -> AppException.notFound("Ride", rideId));

        if (!ACTIVE_STATUSES.contains(ride.getStatus())) {
            throw AppException.badRequest("RIDE_NOT_CANCELLABLE",
                    "Ride cannot be cancelled in status: " + ride.getStatus());
        }

        ride.setStatus("cancelled");
        ride.setCancelledAt(Instant.now());
        ride.setCancellationReason(reason);
        ride = rideRepository.save(ride);

        saveStatusHistory(ride.getId(), ride.getStatus(), "cancelled", actor, reason);
        eventPublisher.publishRideCancelled(ride);

        return buildResponse(ride);
    }

    public RideResponse getRide(UUID rideId) {
        var ride = rideRepository.findById(rideId)
                .orElseThrow(() -> AppException.notFound("Ride", rideId));
        return buildResponse(ride);
    }

    public RideResponse getCurrentRide(UUID userId) {
        return rideRepository.findByPassengerIdAndStatusIn(userId, ACTIVE_STATUSES)
                .map(this::buildResponse)
                .orElse(null);
    }

    public Page<RideResponse> getRideHistory(UUID userId, Pageable pageable) {
        return rideRepository.findByPassengerIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::buildResponse);
    }

    private void validateNoActiveRide(UUID passengerId) {
        rideRepository.findByPassengerIdAndStatusIn(passengerId, ACTIVE_STATUSES)
                .ifPresent(ride -> {
                    throw AppException.badRequest("ACTIVE_RIDE_EXISTS",
                            "You already have an active ride: " + ride.getId());
                });
    }

    private void validateStatusTransition(String current, String next) {
        var validTransitions = switch (current) {
            case "requested" -> List.of("accepted", "cancelled", "expired");
            case "accepted" -> List.of("driver_arrived", "cancelled");
            case "driver_arrived" -> List.of("in_progress", "cancelled");
            case "in_progress" -> List.of("completed", "cancelled");
            default -> List.<String>of();
        };

        if (!validTransitions.contains(next)) {
            throw AppException.badRequest("INVALID_TRANSITION",
                    "Cannot transition from " + current + " to " + next);
        }
    }

    private void saveStatusHistory(UUID rideId, String from, String to, String changedBy, String reason) {
        statusHistoryRepository.save(RideStatusHistory.builder()
                .rideId(rideId)
                .fromStatus(from)
                .toStatus(to)
                .changedBy(changedBy)
                .reason(reason)
                .build());
    }

    private FareResult calculateFare(BigDecimal distanceKm, int durationMinutes, String rideType, BigDecimal surge) {
        var baseFare = ECONOMY_BASE_FARE;
        var perKm = ECONOMY_PER_KM;
        var perMin = ECONOMY_PER_MIN;
        var minimum = ECONOMY_MINIMUM;

        var distanceCharge = distanceKm.multiply(perKm).setScale(2, RoundingMode.HALF_UP);
        var timeCharge = BigDecimal.valueOf(durationMinutes).multiply(perMin).setScale(2, RoundingMode.HALF_UP);
        var subtotal = baseFare.add(distanceCharge).add(timeCharge);
        var total = subtotal.max(minimum).multiply(surge).setScale(2, RoundingMode.HALF_UP);

        return new FareResult(baseFare, distanceCharge, timeCharge, surge, total);
    }

    private RouteResult estimateRoute(RideRequest request) {
        var pickup = request.getPickup();
        var dest = request.getDestination();

        double distanceKm = com.ridesharing.commons.util.GeoUtils.haversineDistance(
                pickup.getLatitude(), pickup.getLongitude(),
                dest.getLatitude(), dest.getLongitude()
        );
        int durationMinutes = Math.max(1, (int) Math.ceil(distanceKm / 0.5));
        distanceKm = Math.max(0.1, distanceKm);

        return new RouteResult(BigDecimal.valueOf(distanceKm).setScale(2, RoundingMode.HALF_UP), durationMinutes);
    }

    private RideResponse buildResponse(Ride ride) {
        return RideResponse.builder()
                .rideId(ride.getId())
                .passengerId(ride.getPassengerId())
                .driverId(ride.getDriverId())
                .rideType(ride.getRideType())
                .status(ride.getStatus())
                .pickupLatitude(ride.getPickupLatitude())
                .pickupLongitude(ride.getPickupLongitude())
                .pickupAddress(ride.getPickupAddress())
                .destLatitude(ride.getDestLatitude())
                .destLongitude(ride.getDestLongitude())
                .destAddress(ride.getDestAddress())
                .estimatedDistance(ride.getEstimatedDistance())
                .estimatedDuration(ride.getEstimatedDuration())
                .baseFare(ride.getBaseFare())
                .distanceCharge(ride.getDistanceCharge())
                .timeCharge(ride.getTimeCharge())
                .surgeMultiplier(ride.getSurgeMultiplier())
                .promoDiscount(ride.getPromoDiscount())
                .totalFare(ride.getTotalFare())
                .currency(ride.getCurrency())
                .paymentStatus(ride.getPaymentStatus())
                .requestedAt(ride.getRequestedAt())
                .acceptedAt(ride.getAcceptedAt())
                .arrivedAt(ride.getArrivedAt())
                .startedAt(ride.getStartedAt())
                .completedAt(ride.getCompletedAt())
                .build();
    }

    private record FareResult(BigDecimal baseFare, BigDecimal distanceCharge,
                              BigDecimal timeCharge, BigDecimal surgeMultiplier, BigDecimal total) {}
    private record RouteResult(BigDecimal distanceKm, int durationMinutes) {}
}
