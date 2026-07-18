import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RideHeader } from '../components/RideHeader';
import { useRideTimer } from '../hooks/useRideTimer';
import { useRideStore } from '../../../store/rideStore';
import { acceptRide, startRide, completeRide } from '../../../services/websocket/rideSubscription';
import { Button } from '../../../shared/components/Button';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { RideStackParamList } from '../../../shared/types/navigation';
type RideActiveRoute = RouteProp<RideStackParamList, 'RideActive'>;

export function RideActiveScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RideActiveRoute>();
  const { rideId } = route.params;
  const { activeRide } = useRideStore();
  const { formatted } = useRideTimer(activeRide?.status === 'IN_PROGRESS');
  const [phase, setPhase] = useState<'accepted' | 'arrived' | 'in_progress'>('accepted');

  const handleArrived = () => { setPhase('arrived'); };
  const handleStart = () => { setPhase('in_progress'); startRide(rideId); };
  const handleComplete = () => { completeRide(rideId); navigation.replace('RideComplete', { rideId }); };

  const getAction = () => {
    switch (phase) {
      case 'accepted': return <Button title="I've arrived" onPress={handleArrived} />;
      case 'arrived': return <Button title="Start trip" onPress={handleStart} />;
      case 'in_progress': return <Button title="Complete trip" onPress={handleComplete} variant="secondary" />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={{ latitude: 40.7128, longitude: -74.006, latitudeDelta: 0.05, longitudeDelta: 0.025 }} showsUserLocation />
      </View>
      <View style={styles.bottomSheet}>
        <RideHeader status={phase === 'accepted' ? 'ACCEPTED' : phase === 'arrived' ? 'ARRIVED' : 'IN_PROGRESS'} passengerName={activeRide?.passengerName} />
        {phase === 'in_progress' && (
          <View style={styles.timerRow}><Text style={styles.timerLabel}>Trip time</Text><Text style={styles.timerValue}>{formatted}</Text></View>
        )}
        {activeRide && (
          <View style={styles.routeInfo}>
            <Text style={styles.address}>{activeRide.pickupAddress}</Text>
            <Text style={styles.arrow}>↓</Text>
            <Text style={styles.address}>{activeRide.destinationAddress}</Text>
          </View>
        )}
        <View style={styles.actionRow}>{getAction()}</View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  mapContainer: { flex: 1 }, map: { flex: 1 },
  bottomSheet: { backgroundColor: colors.surface, borderTopLeftRadius: borderRadius.xl, borderTopRightRadius: borderRadius.xl, padding: spacing.lg, paddingBottom: spacing.xxl, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 8, gap: spacing.md },
  timerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timerLabel: { fontSize: 14, color: colors.textSecondary },
  timerValue: { fontSize: 20, fontWeight: '700', color: colors.text, fontVariant: ['tabular-nums'] },
  routeInfo: { paddingVertical: spacing.sm, gap: spacing.xs },
  address: { fontSize: 14, color: colors.text },
  arrow: { fontSize: 18, color: colors.textSecondary, marginLeft: 2 },
  actionRow: { marginTop: spacing.sm },
});
