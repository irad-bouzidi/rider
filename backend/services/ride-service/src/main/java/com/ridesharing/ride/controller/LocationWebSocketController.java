package com.ridesharing.ride.controller;

import com.ridesharing.ride.dto.LocationUpdate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.concurrent.TimeUnit;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LocationWebSocketController {

    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/location/driver")
    public void handleDriverLocation(
            @Payload LocationUpdate location,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        String driverId = headerAccessor.getUser() != null
                ? headerAccessor.getUser().getName()
                : location.getDriverId();

        if (driverId == null) return;

        // Cache latest location in Redis (30s TTL)
        String locationKey = "driver:location:" + driverId;
        redisTemplate.opsForValue().set(locationKey, location, 30, TimeUnit.SECONDS);

        // Update geospatial index
        redisTemplate.opsForGeo()
                .add("driver:locations:online",
                        new org.springframework.data.geo.Point(
                                location.getLongitude(), location.getLatitude()),
                        driverId);

        // Broadcast to active ride subscribers
        String rideId = getActiveRideForDriver(driverId);
        if (rideId != null) {
            messagingTemplate.convertAndSend(
                    "/topic/ride/" + rideId + "/location",
                    location
            );
        }

        log.debug("Location update from driver {}: {},{}", driverId,
                location.getLatitude(), location.getLongitude());
    }

    private String getActiveRideForDriver(String driverId) {
        String rideKey = "driver:active_ride:" + driverId;
        Object rideId = redisTemplate.opsForValue().get(rideKey);
        return rideId != null ? rideId.toString() : null;
    }
}
