package com.ridesharing.ride.controller;

import com.ridesharing.commons.dto.ApiResponse;
import com.ridesharing.ride.dto.*;
import com.ridesharing.ride.service.RideService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/rides")
@RequiredArgsConstructor
public class RideController {

    private final RideService rideService;

    @PostMapping("/estimate")
    public ResponseEntity<ApiResponse<RideResponse>> estimate(@Valid @RequestBody RideRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(null, "Use POST /api/v1/rides/request for estimate"));
    }

    @PostMapping("/request")
    public ResponseEntity<ApiResponse<RideResponse>> requestRide(
            @Valid @RequestBody RideRequest request,
            @AuthenticationPrincipal UUID userId
    ) {
        var response = rideService.requestRide(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RideResponse>> getRide(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(rideService.getRide(id)));
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponse<RideResponse>> getCurrentRide(@AuthenticationPrincipal UUID userId) {
        var ride = rideService.getCurrentRide(userId);
        if (ride == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(ApiResponse.ok(ride));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<RideResponse>> cancelRide(
            @PathVariable UUID id,
            @AuthenticationPrincipal UUID userId,
            @RequestBody(required = false) CancelRequest request
    ) {
        var response = rideService.cancelRide(id, userId, "passenger",
                request != null ? request.getReason() : null);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<ApiResponse<RideResponse>> updateStatus(
            @PathVariable UUID id,
            @Valid @RequestBody StatusUpdateRequest request,
            @AuthenticationPrincipal UUID userId
    ) {
        var actor = determineActor();
        var response = rideService.updateStatus(id, request.getStatus(), userId, actor);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<Page<RideResponse>>> getHistory(
            @AuthenticationPrincipal UUID userId,
            Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.ok(rideService.getRideHistory(userId, pageable)));
    }

    private String determineActor() {
        var auth = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_DRIVER"))) {
            return "driver";
        }
        return "passenger";
    }
}
