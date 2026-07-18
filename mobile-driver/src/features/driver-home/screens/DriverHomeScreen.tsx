import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { OnlineToggle } from '../components/OnlineToggle';
import { RideRequestCard } from '../components/RideRequestCard';
import { useDriverStatus } from '../hooks/useDriverStatus';
import { useRideRequests } from '../hooks/useRideRequests';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { config } from '../../../shared/constants/config';

export function DriverHomeScreen() {
  const navigation = useNavigation<any>();
  const { isOnline, toggleOnline } = useDriverStatus();
  const { pendingRequests } = useRideRequests();
  const { removePendingRequest, setActiveRide } = useRideStore();

  const handleAccept = (requestId: string) => {
    removePendingRequest(requestId);
    navigation.navigate('Ride', { screen: 'RideActive', params: { rideId: requestId } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map}
          initialRegion={{ latitude: config.map.defaultLatitude, longitude: config.map.defaultLongitude, latitudeDelta: config.map.defaultLatitudeDelta, longitudeDelta: config.map.defaultLongitudeDelta }}
          showsUserLocation
        />
      </View>
      <View style={styles.topBar}>
        <Text style={styles.brand}>Ride Sharing</Text>
        <OnlineToggle isOnline={isOnline} onToggle={toggleOnline} />
      </View>
      <View style={styles.bottomSection}>
        {isOnline && pendingRequests.length > 0 ? (
          <FlatList data={pendingRequests} keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RideRequestCard request={item} onAccept={() => handleAccept(item.id)} onReject={() => removePendingRequest(item.id)} />
            )}
            contentContainerStyle={styles.requestList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.statusContainer}>
            <Text style={styles.statusIcon}>{isOnline ? '🟢' : '⚪'}</Text>
            <Text style={styles.statusText}>{isOnline ? 'Waiting for ride requests' : 'Go online to start receiving rides'}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  mapContainer: { ...StyleSheet.absoluteFillObject },
  map: { flex: 1 },
  topBar: { position: 'absolute', top: 60, left: spacing.lg, right: spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: 18, fontWeight: '800', color: colors.white, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  bottomSection: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: spacing.xxl },
  requestList: { paddingBottom: spacing.lg },
  statusContainer: { alignItems: 'center', paddingVertical: spacing.xxl, backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginHorizontal: spacing.lg, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  statusIcon: { fontSize: 48, marginBottom: spacing.md },
  statusText: { fontSize: 16, color: colors.textSecondary },
});
