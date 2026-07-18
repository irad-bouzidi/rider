package com.ridesharing.ride.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LocationUpdate {
    private String driverId;
    private Double latitude;
    private Double longitude;
    private Float heading;
    private Float speed;
    private Float accuracy;
    private Long timestamp;
}
