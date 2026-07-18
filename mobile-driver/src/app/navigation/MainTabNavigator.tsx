import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DriverHomeScreen } from '../../features/driver-home/screens/DriverHomeScreen';
import { EarningsScreen } from '../../features/earnings/screens/EarningsScreen';
import { WalletScreen } from '../../features/wallet/screens/WalletScreen';
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen';
import { MainTabParamList } from '../../shared/types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#999',
    }}>
      <Tab.Screen name="DriverHome" component={DriverHomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Earnings" component={EarningsScreen} options={{ tabBarLabel: 'Earnings' }} />
      <Tab.Screen name="Wallet" component={WalletScreen} options={{ tabBarLabel: 'Wallet' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}
