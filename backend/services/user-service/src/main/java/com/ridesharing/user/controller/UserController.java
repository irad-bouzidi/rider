package com.ridesharing.user.controller;

import com.ridesharing.commons.dto.ApiResponse;
import com.ridesharing.user.dto.UpdateProfileRequest;
import com.ridesharing.user.dto.UserProfileResponse;
import com.ridesharing.user.model.FavoriteLocation;
import com.ridesharing.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile(@AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(ApiResponse.ok(userService.getProfile(userId)));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(
            @AuthenticationPrincipal UUID userId,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok(userService.updateProfile(userId, request)));
    }

    @PostMapping("/me/favorites")
    public ResponseEntity<ApiResponse<FavoriteLocation>> addFavorite(
            @AuthenticationPrincipal UUID userId,
            @Valid @RequestBody Map<String, Object> body
    ) {
        var favorite = userService.addFavoriteLocation(
                userId,
                (String) body.get("name"),
                (String) body.get("address"),
                Double.valueOf(body.get("latitude").toString()),
                Double.valueOf(body.get("longitude").toString()),
                (String) body.get("placeId")
        );
        return ResponseEntity.ok(ApiResponse.ok(favorite));
    }

    @GetMapping("/me/favorites")
    public ResponseEntity<ApiResponse<List<FavoriteLocation>>> getFavorites(@AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(ApiResponse.ok(userService.getFavoriteLocations(userId)));
    }

    @DeleteMapping("/me/favorites/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFavorite(
            @AuthenticationPrincipal UUID userId,
            @PathVariable UUID id
    ) {
        userService.deleteFavoriteLocation(userId, id);
        return ResponseEntity.ok(ApiResponse.ok(null, "Favorite deleted"));
    }
}
