package com.ridesharing.commons.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RideEvent extends BaseEvent {
    private UUID rideId;
    private UUID passengerId;
    private UUID driverId;
    private String status;
    private BigDecimal fare;
    private String rideType;
    private Double pickupLatitude;
    private Double pickupLongitude;
    private Double destLatitude;
    private Double destLongitude;

    public RideEvent(String eventType) {
        super(eventType);
    }
}
