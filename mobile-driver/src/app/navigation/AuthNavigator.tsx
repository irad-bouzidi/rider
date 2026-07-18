import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../../features/auth/screens/RegisterScreen';
import { VerifyOtpScreen } from '../../features/auth/screens/VerifyOtpScreen';
import { ForgotPasswordScreen } from '../../features/auth/screens/ForgotPasswordScreen';
import { DocumentsScreen } from '../../features/documents/screens/DocumentsScreen';
import { VehicleScreen } from '../../features/vehicle/screens/VehicleScreen';
import { AuthStackParamList } from '../../shared/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="DocumentsOnboarding" component={DocumentsScreen} />
      <Stack.Screen name="VehicleRegistration" component={VehicleScreen} />
    </Stack.Navigator>
  );
}
