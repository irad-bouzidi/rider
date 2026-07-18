import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { EditProfileScreen } from '../../features/profile/screens/EditProfileScreen';
import { FavoriteLocationsScreen } from '../../features/profile/screens/FavoriteLocationsScreen';
import { SettingsScreen } from '../../features/profile/screens/SettingsScreen';
import { PaymentMethodsScreen } from '../../features/payment/screens/PaymentMethodsScreen';
import { AddCardScreen } from '../../features/payment/screens/AddCardScreen';
import { WalletScreen } from '../../features/payment/screens/WalletScreen';
import { SupportScreen } from '../../features/support/screens/SupportScreen';
import { RideDetailScreen } from '../../features/history/screens/RideDetailScreen';

export type MainStackParamList = {
  MainTabs: undefined;
  EditProfile: undefined;
  FavoriteLocations: undefined;
  Settings: undefined;
  PaymentMethods: undefined;
  AddCard: undefined;
  Wallet: undefined;
  Support: undefined;
  RideDetail: { rideId: string };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="FavoriteLocations" component={FavoriteLocationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="RideDetail" component={RideDetailScreen} />
    </Stack.Navigator>
  );
}
