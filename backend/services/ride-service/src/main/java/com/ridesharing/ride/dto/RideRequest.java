package com.ridesharing.ride.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideRequest {
    @NotNull @Valid
    private Location pickup;

    @NotNull @Valid
    private Location destination;

    @NotBlank
    private String rideType;

    private String paymentMethod;
    private String promoCode;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Location {
        @NotNull
        private Double latitude;

        @NotNull
        private Double longitude;

        private String address;
        private String placeId;
    }
}
