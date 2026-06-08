package com.ridesharing.ride.repository;

import com.ridesharing.ride.model.RideStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RideStatusHistoryRepository extends JpaRepository<RideStatusHistory, UUID> {
    List<RideStatusHistory> findByRideIdOrderByCreatedAtAsc(UUID rideId);
}
