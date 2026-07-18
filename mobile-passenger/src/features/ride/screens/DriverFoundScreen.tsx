import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DriverInfoCard } from '../components/DriverInfoCard';
import { DriverETA } from '../components/DriverETA';
import { SOSButton } from '../components/SOSButton';
import { useDriverLocation } from '../hooks/useDriverLocation';
import { RideStackParamList } from '../../../shared/types/navigation';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

type DriverFoundRoute = RouteProp<RideStackParamList, 'DriverFound'>;

const MOCK_DRIVER = {
  id: '1',
  fullName: 'Alex Johnson',
  phone: '+1 (555) 123-4567',
  rating: 4.8,
  totalRides: 1247,
  photoUrl: '',
  vehicle: {
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    color: 'White',
    licensePlate: 'ABC 1234',
  },
  location: { latitude: 40.7128, longitude: -74.006 },
};

export function DriverFoundScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<DriverFoundRoute>();
  const { rideId, driverId } = route.params;
  const { driverLocation } = useDriverLocation(driverId);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('RideActive', { rideId });
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigation, rideId]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.006,
            latitudeDelta: 0.05,
            longitudeDelta: 0.025,
          }}
          showsUserLocation
        />
      </View>

      <View style={styles.bottomSheet}>
        <DriverInfoCard driver={MOCK_DRIVER} />
        <DriverETA minutes={4} distance="1.2 km" />

        <View style={styles.actionsRow}>
          <SOSButton />
          <View style={styles.actionsRight}>
            <ActionButton title="Message" onPress={() => {}} />
            <ActionButton title="Call" onPress={() => {}} variant="primary" />
          </View>
        </View>

        <ActionButton
          title="Cancel ride"
          onPress={() => navigation.goBack()}
          variant="ghost"
          style={styles.cancelBtn}
        />
      </View>
    </SafeAreaView>
  );
}

function ActionButton({
  title,
  onPress,
  variant = 'default',
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: 'default' | 'primary' | 'ghost';
  style?: any;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.actionBtn,
        variant === 'primary' && styles.actionBtnPrimary,
        variant === 'ghost' && styles.actionBtnGhost,
        style,
      ]}
    >
      <Text
        style={[
          styles.actionBtnText,
          variant === 'primary' && styles.actionBtnTextPrimary,
          variant === 'ghost' && styles.actionBtnTextGhost,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  actionsRight: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  actionBtnPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionBtnGhost: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  actionBtnTextPrimary: {
    color: colors.white,
  },
  actionBtnTextGhost: {
    color: colors.error,
  },
  cancelBtn: {
    marginTop: spacing.md,
  },
});
