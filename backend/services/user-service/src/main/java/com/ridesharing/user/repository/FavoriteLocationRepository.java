package com.ridesharing.user.repository;

import com.ridesharing.user.model.FavoriteLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FavoriteLocationRepository extends JpaRepository<FavoriteLocation, UUID> {
    List<FavoriteLocation> findByUserIdOrderBySortOrderAsc(UUID userId);
    void deleteByUserIdAndId(UUID userId, UUID id);
}
