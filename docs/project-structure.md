# Project Structure

## Complete Repository Tree

```
ride-hailing/
├── README.md
├── LICENSE
├── .gitignore
├── .gitattributes
├── .editorconfig
│
├── docs/
│   ├── README.md
│   ├── requirements.md
│   ├── architecture.md
│   ├── mobile-architecture.md
│   ├── backend-architecture.md
│   ├── database-design.md
│   ├── api-specification.md
│   ├── real-time-architecture.md
│   ├── ride-matching.md
│   ├── pricing-engine.md
│   ├── payment-system.md
│   ├── security.md
│   ├── notification-system.md
│   ├── admin-dashboard.md
│   ├── devops.md
│   ├── monitoring.md
│   ├── testing.md
│   ├── project-structure.md
│   ├── roadmap.md
│   └── ai-recommendations.md
│
├── mobile-passenger/
│   ├── app.json
│   ├── App.tsx
│   ├── babel.config.js
│   ├── metro.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── eas.json
│   ├── .env.example
│   ├── .env.development
│   ├── .env.production
│   │
│   ├── android/
│   │   ├── app/
│   │   │   ├── src/main/
│   │   │   │   ├── AndroidManifest.xml
│   │   │   │   ├── java/com/ridesharing/
│   │   │   │   │   ├── MainActivity.kt
│   │   │   │   │   └── MainApplication.kt
│   │   │   │   └── res/
│   │   │   └── build.gradle.kts
│   │   ├── build.gradle.kts
│   │   ├── settings.gradle.kts
│   │   └── gradle.properties
│   │
│   ├── ios/
│   │   ├── RideSharing/
│   │   │   ├── AppDelegate.mm
│   │   │   ├── Info.plist
│   │   │   ├── LaunchScreen.storyboard
│   │   │   └── Images.xcassets/
│   │   ├── Podfile
│   │   └── RideSharing.xcodeproj/
│   │
│   └── src/
│       ├── app/
│       │   ├── App.tsx
│       │   ├── providers.tsx
│       │   └── navigation/
│       │       ├── RootNavigator.tsx
│       │       ├── AuthNavigator.tsx
│       │       ├── MainTabNavigator.tsx
│       │       ├── RideNavigator.tsx
│       │       └── types.ts
│       │
│       ├── features/
│       │   ├── auth/
│       │   │   ├── screens/
│       │   │   │   ├── LoginScreen.tsx
│       │   │   │   ├── RegisterScreen.tsx
│       │   │   │   ├── VerifyOtpScreen.tsx
│       │   │   │   ├── ForgotPasswordScreen.tsx
│       │   │   │   └── WelcomeScreen.tsx
│       │   │   ├── components/
│       │   │   │   ├── SocialLoginButton.tsx
│       │   │   │   ├── PhoneInput.tsx
│       │   │   │   ├── OtpInput.tsx
│       │   │   │   └── PasswordInput.tsx
│       │   │   ├── hooks/
│       │   │   │   ├── useAuth.ts
│       │   │   │   ├── usePhoneVerification.ts
│       │   │   │   └── useSocialLogin.ts
│       │   │   ├── services/
│       │   │   │   └── authApi.ts
│       │   │   ├── store/
│       │   │   │   └── authStore.ts
│       │   │   ├── types.ts
│       │   │   └── validation.ts
│       │   │
│       │   ├── home/
│       │   │   ├── screens/
│       │   │   │   └── HomeScreen.tsx
│       │   │   ├── components/
│       │   │   │   ├── MapView.tsx
│       │   │   │   ├── LocationSearchBar.tsx
│       │   │   │   ├── PickupPin.tsx
│       │   │   │   ├── DestinationPin.tsx
│       │   │   │   ├── RideTypeSelector.tsx
│       │   │   │   ├── FareEstimateCard.tsx
│       │   │   │   ├── DriverMarker.tsx
│       │   │   │   ├── CurrentLocationButton.tsx
│       │   │   │   ├── SavedLocationItem.tsx
│       │   │   │   └── PromoCodeInput.tsx
│       │   │   ├── hooks/
│       │   │   │   ├── useCurrentLocation.ts
│       │   │   │   ├── useLocationSearch.ts
│       │   │   │   ├── useMapRegion.ts
│       │   │   │   └── useFareEstimate.ts
│       │   │   ├── services/
│       │   │   │   ├── locationApi.ts
│       │   │   │   └── rideApi.ts
│       │   │   ├── store/
│       │   │   │   └── rideStore.ts
│       │   │   └── types.ts
│       │   │
│       │   ├── ride/
│       │   │   ├── screens/
│       │   │   │   ├── SearchingScreen.tsx
│       │   │   │   ├── DriverFoundScreen.tsx
│       │   │   │   ├── RideActiveScreen.tsx
│       │   │   │   └── RideCompleteScreen.tsx
│       │   │   ├── components/
│       │   │   │   ├── DriverInfoCard.tsx
│       │   │   │   ├── RideStatusBar.tsx
│       │   │   │   ├── DriverETA.tsx
│       │   │   │   ├── SOSButton.tsx
│       │   │   │   ├── ShareTripButton.tsx
│       │   │   │   ├── RatingSheet.tsx
│       │   │   │   ├── TipSelector.tsx
│       │   │   │   └── TripReceipt.tsx
│       │   │   ├── hooks/
│       │   │   │   ├── useActiveRide.ts
│       │   │   │   ├── useDriverLocation.ts
│       │   │   │   └── useRideTimer.ts
│       │   │   ├── services/
│       │   │   │   ├── rideSocket.ts
│       │   │   │   └── rideApi.ts
│       │   │   └── store/
│       │   │       └── activeRideStore.ts
│       │   │
│       │   ├── payment/
│       │   │   ├── screens/
│       │   │   │   ├── PaymentMethodsScreen.tsx
│       │   │   │   ├── AddCardScreen.tsx
│       │   │   │   └── WalletScreen.tsx
│       │   │   ├── components/
│       │   │   │   ├── CardItem.tsx
│       │   │   │   ├── PaymentMethodSelector.tsx
│       │   │   │   └── WalletBalanceCard.tsx
│       │   │   ├── services/
│       │   │   │   └── paymentApi.ts
│       │   │   └── store/
│       │   │       └── paymentStore.ts
│       │   │
│       │   ├── profile/
│       │   │   ├── screens/
│       │   │   │   ├── ProfileScreen.tsx
│       │   │   │   ├── EditProfileScreen.tsx
│       │   │   │   ├── FavoriteLocationsScreen.tsx
│       │   │   │   └── SettingsScreen.tsx
│       │   │   ├── components/
│       │   │   │   ├── ProfileHeader.tsx
│       │   │   │   └── SettingsRow.tsx
│       │   │   ├── services/
│       │   │   │   └── userApi.ts
│       │   │   └── store/
│       │   │       └── userStore.ts
│       │   │
│       │   ├── history/
│       │   │   ├── screens/
│       │   │   │   ├── RideHistoryScreen.tsx
│       │   │   │   └── RideDetailScreen.tsx
│       │   │   ├── components/
│       │   │   │   ├── RideCard.tsx
│       │   │   │   └── RideFilterBar.tsx
│       │   │   ├── services/
│       │   │   │   └── historyApi.ts
│       │   │   └── types.ts
│       │   │
│       │   └── support/
│       │       ├── screens/
│       │       │   ├── SupportScreen.tsx
│       │       │   └── ChatScreen.tsx
│       │       ├── components/
│       │       │   ├── ChatMessage.tsx
│       │       │   └── ChatInput.tsx
│       │       ├── services/
│       │       │   └── supportApi.ts
│       │       └── store/
│       │           └── supportStore.ts
│       │
│       ├── shared/
│       │   ├── components/
│       │   │   ├── Button.tsx
│       │   │   ├── TextInput.tsx
│       │   │   ├── LoadingOverlay.tsx
│       │   │   ├── ErrorBoundary.tsx
│       │   │   ├── NetworkStatusBar.tsx
│       │   │   ├── Toast.tsx
│       │   │   ├── BottomSheet.tsx
│       │   │   ├── Modal.tsx
│       │   │   ├── Avatar.tsx
│       │   │   ├── EmptyState.tsx
│       │   │   ├── Badge.tsx
│       │   │   ├── Divider.tsx
│       │   │   ├── ListItem.tsx
│       │   │   └── StarRating.tsx
│       │   ├── hooks/
│       │   │   ├── useNetworkStatus.ts
│       │   │   ├── useDebounce.ts
│       │   │   ├── useAppState.ts
│       │   │   ├── useKeyboardHeight.ts
│       │   │   ├── usePermissions.ts
│       │   │   └── useDeepLink.ts
│       │   ├── utils/
│       │   │   ├── formatCurrency.ts
│       │   │   ├── formatDate.ts
│       │   │   ├── formatDistance.ts
│       │   │   ├── formatDuration.ts
│       │   │   ├── validation.ts
│       │   │   ├── locationUtils.ts
│       │   │   ├── mapUtils.ts
│       │   │   └── storage.ts
│       │   ├── types/
│       │   │   ├── api.ts
│       │   │   ├── ride.ts
│       │   │   ├── user.ts
│       │   │   ├── driver.ts
│       │   │   ├── payment.ts
│       │   │   ├── location.ts
│       │   │   ├── notification.ts
│       │   │   └── navigation.ts
│       │   ├── constants/
│       │   │   ├── api.ts
│       │   │   ├── theme.ts
│       │   │   ├── colors.ts
│       │   │   ├── spacing.ts
│       │   │   ├── typography.ts
│       │   │   ├── config.ts
│       │   │   └── rideTypes.ts
│       │   └── i18n/
│       │       ├── index.ts
│       │       ├── en.json
│       │       ├── es.json
│       │       ├── fr.json
│       │       ├── ar.json
│       │       └── de.json
│       │
│       ├── services/
│       │   ├── api/
│       │   │   ├── client.ts
│       │   │   ├── authInterceptor.ts
│       │   │   ├── errorInterceptor.ts
│       │   │   ├── retryInterceptor.ts
│       │   │   └── queryClient.ts
│       │   ├── websocket/
│       │   │   ├── socketClient.ts
│       │   │   ├── locationEmitter.ts
│       │   │   └── rideSubscription.ts
│       │   ├── location/
│       │   │   ├── LocationService.ts
│       │   │   └── PermissionManager.ts
│       │   └── notification/
│       │       ├── NotificationService.ts
│       │       └── handlers.ts
│       │
│       ├── store/
│       │   ├── index.ts
│       │   ├── authStore.ts
│       │   ├── rideStore.ts
│       │   ├── activeRideStore.ts
│       │   ├── paymentStore.ts
│       │   └── uiStore.ts
│       │
│       └── theme/
│           ├── index.ts
│           ├── colors.ts
│           ├── spacing.ts
│           └── typography.ts
│
├── mobile-driver/
│   ├── app.json
│   ├── App.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── eas.json
│   ├── .env.example
│   │
│   ├── android/
│   └── ios/
│       (same structure as passenger)
│
│   └── src/
│       ├── app/
│       │   ├── App.tsx
│       │   ├── providers.tsx
│       │   └── navigation/
│       │       ├── RootNavigator.tsx
│       │       ├── AuthNavigator.tsx
│       │       ├── MainTabNavigator.tsx
│       │       └── RideNavigator.tsx
│       │
│       ├── features/
│       │   ├── auth/
│       │   │   (different from passenger - includes document upload)
│       │   │   ├── screens/
│       │   │   │   ├── LoginScreen.tsx
│       │   │   │   ├── RegisterScreen.tsx
│       │   │   │   ├── RegisterStep1Screen.tsx
│       │   │   │   ├── RegisterStep2Screen.tsx
│       │   │   │   └── RegisterCompleteScreen.tsx
│       │   │   └── ...
│       │   │
│       │   ├── driver-home/
│       │   │   ├── screens/
│       │   │   │   ├── DriverHomeScreen.tsx
│       │   │   │   └── NavigationScreen.tsx
│       │   │   ├── components/
│       │   │   │   ├── OnlineToggle.tsx
│       │   │   │   ├── RideRequestCard.tsx
│       │   │   │   ├── RidePreview.tsx
│       │   │   │   └── EarningsWidget.tsx
│       │   │   ├── hooks/
│       │   │   │   └── useRideRequests.ts
│       │   │   ├── services/
│       │   │   │   └── driverApi.ts
│       │   │   └── store/
│       │   │       └── driverStore.ts
│       │   │
│       │   ├── earnings/
│       │   │   ├── screens/
│       │   │   │   ├── EarningsScreen.tsx
│       │   │   │   └── EarningsDetailScreen.tsx
│       │   │   └── components/
│       │   │       ├── EarningsSummaryCard.tsx
│       │   │       └── EarningsChart.tsx
│       │   │
│       │   ├── wallet/
│       │   │   ├── screens/
│       │   │   │   ├── WalletScreen.tsx
│       │   │   │   └── WithdrawScreen.tsx
│       │   │   └── components/
│       │   │       ├── BalanceCard.tsx
│       │   │       └── TransactionItem.tsx
│       │   │
│       │   ├── documents/
│       │   │   ├── screens/
│       │   │   │   ├── DocumentsScreen.tsx
│       │   │   │   └── UploadDocumentScreen.tsx
│       │   │   └── components/
│       │   │       ├── DocumentCard.tsx
│       │   │       └── DocumentStatusBadge.tsx
│       │   │
│       │   └── profile/
│       │       ├── screens/
│       │       │   ├── ProfileScreen.tsx
│       │       │   └── SettingsScreen.tsx
│       │       └── components/
│       │           ├── DriverRating.tsx
│       │           └── VehicleInfoCard.tsx
│       │
│       ├── shared/
│       │   (shared components - same structure as passenger)
│       │
│       └── services/
│           ├── api/
│           ├── websocket/
│           ├── location/
│           └── notification/
│
├── backend/
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── gradle/
│   │   └── wrapper/
│   │
│   ├── commons/
│   │   ├── build.gradle.kts
│   │   └── src/main/java/com/ridesharing/commons/
│   │       ├── dto/
│   │       ├── exception/
│   │       ├── security/
│   │       ├── config/
│   │       ├── event/
│   │       └── util/
│   │
│   ├── api-gateway/
│   │   ├── build.gradle.kts
│   │   └── src/main/java/com/ridesharing/gateway/
│   │       ├── GatewayApplication.java
│   │       ├── config/
│   │       ├── filter/
│   │       │   ├── JwtAuthenticationFilter.java
│   │       │   └── RateLimitingFilter.java
│   │       └── route/
│   │
│   ├── services/
│   │   ├── auth-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/auth/
│   │   │       ├── AuthApplication.java
│   │   │       ├── controller/
│   │   │       │   └── AuthController.java
│   │   │       ├── service/
│   │   │       │   ├── AuthenticationService.java
│   │   │       │   ├── OtpService.java
│   │   │       │   ├── JwtTokenProvider.java
│   │   │       │   └── SocialLoginService.java
│   │   │       ├── repository/
│   │   │       │   ├── UserRepository.java
│   │   │       │   ├── RefreshTokenRepository.java
│   │   │       │   └── OtpCodeRepository.java
│   │   │       ├── model/
│   │   │       │   ├── User.java
│   │   │       │   ├── RefreshToken.java
│   │   │       │   └── OtpCode.java
│   │   │       ├── dto/
│   │   │       ├── security/
│   │   │       └── config/
│   │   │
│   │   ├── user-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/user/
│   │   │       ├── UserApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       └── dto/
│   │   │
│   │   ├── driver-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/driver/
│   │   │       ├── DriverApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       └── dto/
│   │   │
│   │   ├── vehicle-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/vehicle/
│   │   │       ├── VehicleApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       └── dto/
│   │   │
│   │   ├── ride-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/ride/
│   │   │       ├── RideApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       ├── dto/
│   │   │       ├── state/
│   │   │       │   └── RideStateMachine.java
│   │   │       └── event/
│   │   │
│   │   ├── matching-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/matching/
│   │   │       ├── MatchingApplication.java
│   │   │       ├── controller/
│   │   │       ├── engine/
│   │   │       │   ├── GeospatialQueryEngine.java
│   │   │       │   ├── DriverRankingEngine.java
│   │   │       │   ├── DispatchEngine.java
│   │   │       │   └── ETACalculator.java
│   │   │       └── config/
│   │   │
│   │   ├── pricing-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/pricing/
│   │   │       ├── PricingApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       │   ├── PricingService.java
│   │   │       │   ├── SurgeCalculator.java
│   │   │       │   └── PromoEngine.java
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       └── dto/
│   │   │
│   │   ├── payment-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/payment/
│   │   │       ├── PaymentApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       │   ├── PaymentService.java
│   │   │       │   ├── WalletService.java
│   │   │       │   ├── PayoutService.java
│   │   │       │   ├── RefundService.java
│   │   │       │   └── ReceiptService.java
│   │   │       ├── stripe/
│   │   │       │   └── StripeWebhookController.java
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       └── dto/
│   │   │
│   │   ├── notification-service/
│   │   │   ├── build.gradle.kts
│   │   │   ├── Dockerfile
│   │   │   └── src/main/java/com/ridesharing/notification/
│   │   │       ├── NotificationApplication.java
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       │   ├── PushNotificationService.java
│   │   │       │   ├── SmsService.java
│   │   │       │   ├── EmailService.java
│   │   │       │   └── TemplateEngine.java
│   │   │       ├── consumer/
│   │   │       │   └── EventConsumer.java
│   │   │       ├── repository/
│   │   │       ├── model/
│   │   │       └── dto/
│   │   │
│   │   └── analytics-service/
│   │       ├── build.gradle.kts
│   │       ├── Dockerfile
│   │       └── src/main/java/com/ridesharing/analytics/
│   │           ├── AnalyticsApplication.java
│   │           ├── controller/
│   │           ├── service/
│   │           ├── consumer/
│   │           ├── repository/
│   │           ├── model/
│   │           └── dto/
│   │
│   ├── integrations/
│   │   build.gradle.kts
│   │
│   └── resources/
│       ├── db/
│       │   └── migration/
│       │       ├── V1__initial_schema.sql
│       │       ├── V1.1__seed_vehicle_types.sql
│       │       ├── V2__add_ride_indexes.sql
│       │       └── V3__add_partitioning.sql
│       ├── application.yml
│       ├── application-dev.yml
│       ├── application-staging.yml
│       └── application-prod.yml
│
├── admin-dashboard/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   │
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── api/
│       │   ├── client.ts
│       │   └── endpoints/
│       ├── components/
│       │   ├── layouts/
│       │   │   ├── AdminLayout.tsx
│       │   │   ├── Sidebar.tsx
│       │   │   └── Header.tsx
│       │   ├── common/
│       │   │   ├── DataTable.tsx
│       │   │   ├── StatCard.tsx
│       │   │   ├── Chart.tsx
│       │   │   └── StatusBadge.tsx
│       │   └── ...
│       ├── pages/
│       │   ├── Dashboard/
│       │   ├── Users/
│       │   ├── Drivers/
│       │   ├── Vehicles/
│       │   ├── Rides/
│       │   ├── Payments/
│       │   ├── Promotions/
│       │   ├── Support/
│       │   ├── Analytics/
│       │   └── Settings/
│       ├── hooks/
│       ├── store/
│       ├── utils/
│       └── types/
│
├── infrastructure/
│   ├── terraform/
│   │   ├── modules/
│   │   │   ├── vpc/
│   │   │   ├── eks/
│   │   │   ├── rds/
│   │   │   ├── elasticache/
│   │   │   ├── msk/
│   │   │   ├── s3/
│   │   │   ├── iam/
│   │   │   ├── monitoring/
│   │   │   └── cicd/
│   │   ├── environments/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── prod/
│   │   └── global/
│   │
│   ├── kubernetes/
│   │   ├── charts/
│   │   │   └── ridesharing/
│   │   │       ├── Chart.yaml
│   │   │       ├── values.yaml
│   │   │       ├── values-dev.yaml
│   │   │       ├── values-staging.yaml
│   │   │       ├── values-prod.yaml
│   │   │       └── templates/
│   │   ├── namespaces.yaml
│   │   └── monitoring/
│   │       ├── prometheus/
│   │       └── grafana/
│   │
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.monitoring.yml
│   │   └── Dockerfile
│   │
│   └── scripts/
│       ├── setup.sh
│       ├── seed-data.sh
│       ├── backup.sh
│       └── migrate.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── security-scan.yml
│
└── scripts/
    ├── setup-dev.sh
    ├── db-migrate.sh
    └── load-test.sh
```
