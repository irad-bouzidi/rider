package com.ridesharing.ride.service;

import com.ridesharing.ride.model.Ride;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class RideEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishRideRequested(Ride ride) {
        var event = Map.of(
                "eventType", "RideRequested",
                "rideId", ride.getId().toString(),
                "passengerId", ride.getPassengerId().toString(),
                "pickupLatitude", ride.getPickupLatitude(),
                "pickupLongitude", ride.getPickupLongitude(),
                "rideType", ride.getRideType(),
                "fare", ride.getTotalFare().doubleValue()
        );
        rabbitTemplate.convertAndSend("ride.exchange", "ride.requested", event);
        log.info("Published RideRequested event for rideId={}", ride.getId());
    }

    public void publishRideAccepted(Ride ride) {
        var event = Map.of(
                "eventType", "RideAccepted",
                "rideId", ride.getId().toString(),
                "driverId", ride.getDriverId().toString(),
                "passengerId", ride.getPassengerId().toString()
        );
        rabbitTemplate.convertAndSend("ride.exchange", "ride.accepted", event);
    }

    public void publishRideCompleted(Ride ride) {
        var event = Map.of(
                "eventType", "RideCompleted",
                "rideId", ride.getId().toString(),
                "driverId", ride.getDriverId().toString(),
                "passengerId", ride.getPassengerId().toString(),
                "fare", ride.getTotalFare().doubleValue(),
                "status", ride.getStatus()
        );
        rabbitTemplate.convertAndSend("ride.exchange", "ride.completed", event);
    }

    public void publishRideCancelled(Ride ride) {
        var event = Map.of(
                "eventType", "RideCancelled",
                "rideId", ride.getId().toString(),
                "passengerId", ride.getPassengerId().toString(),
                "driverId", ride.getDriverId() != null ? ride.getDriverId().toString() : null,
                "reason", ride.getCancellationReason()
        );
        rabbitTemplate.convertAndSend("ride.exchange", "ride.cancelled", event);
    }
}
