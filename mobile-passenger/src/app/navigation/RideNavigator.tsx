import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchingScreen } from '../../features/ride/screens/SearchingScreen';
import { DriverFoundScreen } from '../../features/ride/screens/DriverFoundScreen';
import { RideActiveScreen } from '../../features/ride/screens/RideActiveScreen';
import { RideCompleteScreen } from '../../features/ride/screens/RideCompleteScreen';
import { RideStackParamList } from '../../shared/types/navigation';

const Stack = createNativeStackNavigator<RideStackParamList>();

export function RideNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Searching" component={SearchingScreen} />
      <Stack.Screen name="DriverFound" component={DriverFoundScreen} />
      <Stack.Screen name="RideActive" component={RideActiveScreen} />
      <Stack.Screen name="RideComplete" component={RideCompleteScreen} />
    </Stack.Navigator>
  );
}
