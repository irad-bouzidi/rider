import { NavigatorScreenParams } from '@react-navigation/native';
export type AuthStackParamList = {
  Login: undefined; Register: undefined; VerifyOtp: { phone: string; name?: string };
  ForgotPassword: undefined; DocumentsOnboarding: undefined; VehicleRegistration: undefined;
};
export type MainTabParamList = { DriverHome: undefined; Earnings: undefined; Wallet: undefined; Profile: undefined; };
export type RideStackParamList = {
  RideRequest: { requestId: string }; RideActive: { rideId: string }; RideComplete: { rideId: string };
};
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Ride: NavigatorScreenParams<RideStackParamList>;
};
