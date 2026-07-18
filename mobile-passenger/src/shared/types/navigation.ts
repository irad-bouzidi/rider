import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  VerifyOtp: { phone: string; name?: string };
  ForgotPassword: undefined;
  Welcome: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Profile: undefined;
};

export type RideStackParamList = {
  Searching: { rideRequestId: string };
  DriverFound: { rideId: string; driverId: string };
  RideActive: { rideId: string };
  RideComplete: { rideId: string };
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Ride: NavigatorScreenParams<RideStackParamList>;
};
