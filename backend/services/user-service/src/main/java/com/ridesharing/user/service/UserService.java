package com.ridesharing.user.service;

import com.ridesharing.commons.exception.AppException;
import com.ridesharing.user.dto.UpdateProfileRequest;
import com.ridesharing.user.dto.UserProfileResponse;
import com.ridesharing.user.model.FavoriteLocation;
import com.ridesharing.user.model.UserProfile;
import com.ridesharing.user.repository.FavoriteLocationRepository;
import com.ridesharing.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserProfileRepository profileRepository;
    private final FavoriteLocationRepository favoriteLocationRepository;

    @Transactional
    public UserProfileResponse getProfile(UUID userId) {
        var profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> AppException.notFound("UserProfile", userId));
        return toProfileResponse(profile);
    }

    @Transactional
    public UserProfileResponse updateProfile(UUID userId, UpdateProfileRequest request) {
        var profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> AppException.notFound("UserProfile", userId));

        if (request.getFullName() != null) profile.setFullName(request.getFullName());
        if (request.getLanguage() != null) profile.setLanguage(request.getLanguage());
        if (request.getPhotoUrl() != null) profile.setPhotoUrl(request.getPhotoUrl());

        profile = profileRepository.save(profile);
        return toProfileResponse(profile);
    }

    @Transactional
    public FavoriteLocation addFavoriteLocation(UUID userId, String name, String address,
                                                 Double latitude, Double longitude, String placeId) {
        var favorite = FavoriteLocation.builder()
                .userId(userId)
                .name(name)
                .address(address)
                .latitude(latitude)
                .longitude(longitude)
                .placeId(placeId)
                .build();
        return favoriteLocationRepository.save(favorite);
    }

    public List<FavoriteLocation> getFavoriteLocations(UUID userId) {
        return favoriteLocationRepository.findByUserIdOrderBySortOrderAsc(userId);
    }

    @Transactional
    public void deleteFavoriteLocation(UUID userId, UUID locationId) {
        favoriteLocationRepository.deleteByUserIdAndId(userId, locationId);
    }

    @Transactional
    public void createProfile(UUID userId, String fullName, String email, String phone) {
        var profile = UserProfile.builder()
                .userId(userId)
                .fullName(fullName)
                .email(email)
                .phone(phone)
                .build();
        profileRepository.save(profile);
    }

    private UserProfileResponse toProfileResponse(UserProfile profile) {
        return UserProfileResponse.builder()
                .id(profile.getId())
                .userId(profile.getUserId())
                .fullName(profile.getFullName())
                .photoUrl(profile.getPhotoUrl())
                .email(profile.getEmail())
                .phone(profile.getPhone())
                .language(profile.getLanguage())
                .build();
    }
}
