package com.ridesharing.ride.repository;

import com.ridesharing.ride.model.Ride;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RideRepository extends JpaRepository<Ride, UUID> {
    Optional<Ride> findByPassengerIdAndStatusIn(UUID passengerId, Collection<String> statuses);
    Optional<Ride> findByDriverIdAndStatusIn(UUID driverId, Collection<String> statuses);
    Page<Ride> findByPassengerIdOrderByCreatedAtDesc(UUID passengerId, Pageable pageable);
    Page<Ride> findByDriverIdOrderByCreatedAtDesc(UUID driverId, Pageable pageable);
}
