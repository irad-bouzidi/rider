import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapView } from '../components/MapView';
import { LocationSearchBar } from '../components/LocationSearchBar';
import { RideTypeSelector } from '../components/RideTypeSelector';
import { FareEstimateCard } from '../components/FareEstimateCard';
import { CurrentLocationButton } from '../components/CurrentLocationButton';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useLocationSearch } from '../hooks/useLocationSearch';
import { useFareEstimate } from '../hooks/useFareEstimate';
import { useRideStore } from '../../../store/rideStore';
import { usePaymentStore } from '../../../store/paymentStore';
import { Button } from '../../../shared/components/Button';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { SearchResult, Coordinates } from '../../../shared/types/location';
import { RIDE_TYPES, RideTypeConfig } from '../../../shared/constants/rideTypes';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const { location: currentLocation } = useCurrentLocation();
  const search = useLocationSearch();
  const {
    pickup,
    destination,
    pickupAddress,
    destinationAddress,
    selectedRideType,
    fareEstimate,
    setPickup,
    setDestination,
    setSelectedRideType,
    setIsSearching,
  } = useRideStore();
  const { selectedMethodId } = usePaymentStore();

  const [showPickupSearch, setShowPickupSearch] = useState(false);
  const [showDestSearch, setShowDestSearch] = useState(false);

  const { data: fareEstimates } = useFareEstimate(
    pickup,
    destination,
    selectedRideType || undefined,
  );

  const handleSelectPickup = useCallback(
    (result: SearchResult) => {
      setPickup(result.coordinates, result.mainText);
      setShowPickupSearch(false);
      search.clearSearch();
    },
    [setPickup, search],
  );

  const handleSelectDestination = useCallback(
    (result: SearchResult) => {
      setDestination(result.coordinates, result.mainText);
      setShowDestSearch(false);
      search.clearSearch();
    },
    [setDestination, search],
  );

  const handleRequestRide = useCallback(() => {
    if (!pickup || !destination || !selectedRideType) return;
    setIsSearching(true);
    navigation.navigate('Ride', {
      screen: 'Searching',
      params: { rideRequestId: 'pending' },
    });
  }, [pickup, destination, selectedRideType, setIsSearching, navigation]);

  const selectedRideConfig = RIDE_TYPES.find((t) => t.id === selectedRideType);
  const currentFare = fareEstimates?.find((f) => f.rideTypeId === selectedRideType);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.mapContainer}>
        <MapView region={currentLocation ? {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.025,
        } : {
          latitude: 40.7128,
          longitude: -74.006,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} />

        <LocationSearchBar
          placeholder={showPickupSearch ? 'Where to pick up?' : pickupAddress || 'Enter pickup location'}
          value={showPickupSearch ? search.query : ''}
          onChangeText={showPickupSearch ? search.setQuery : () => setShowPickupSearch(true)}
          onClear={search.clearSearch}
          results={showPickupSearch ? search.results : []}
          onSelectResult={handleSelectPickup}
          icon={<Text>📍</Text>}
        />

        {!showPickupSearch && (
          <LocationSearchBar
            placeholder={destinationAddress || 'Where to?'}
            value={showDestSearch ? search.query : ''}
            onChangeText={showDestSearch ? search.setQuery : () => setShowDestSearch(true)}
            onClear={search.clearSearch}
            results={showDestSearch ? search.results : []}
            onSelectResult={handleSelectDestination}
            icon={<Text>🏁</Text>}
          />
        )}

        <CurrentLocationButton
          onPress={() => {}}
        />
      </View>

      <View style={styles.bottomSheet}>
        {pickup && destination && (
          <>
            <RideTypeSelector
              selectedType={selectedRideType}
              onSelectType={(type) => setSelectedRideType(type.id)}
              fareEstimates={fareEstimates}
              pickupSet={!!pickup}
              destinationSet={!!destination}
            />
          </>
        )}

        {currentFare && selectedRideConfig && (
          <View style={styles.rideSummary}>
            <View style={styles.rideInfo}>
              <Text style={styles.rideTypeLabel}>
                {selectedRideConfig.id.charAt(0).toUpperCase() + selectedRideConfig.id.slice(1)}
              </Text>
              <Text style={styles.etaText}>
                {Math.round(currentFare.duration)} min
              </Text>
            </View>
            <Text style={styles.fareText}>
              {formatCurrency(currentFare.estimatedFare)}
            </Text>
          </View>
        )}

        <Button
          title={
            !pickup || !destination
              ? 'Enter destination'
              : !selectedRideType
              ? 'Select ride type'
              : 'Confirm ride'
          }
          onPress={handleRequestRide}
          disabled={!pickup || !destination || !selectedRideType}
          style={styles.confirmButton}
        />
      </View>
    </SafeAreaView>
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
  bottomSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  rideSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rideTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  etaText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  fareText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  confirmButton: {
    marginTop: spacing.md,
  },
});
