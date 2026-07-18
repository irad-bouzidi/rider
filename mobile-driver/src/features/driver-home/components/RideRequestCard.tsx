import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { RideRequest } from '../../../shared/types/ride';
interface RideRequestCardProps { request: RideRequest; onAccept: () => void; onReject: () => void; }
export function RideRequestCard({ request, onAccept, onReject }: RideRequestCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.passenger}>{request.passengerName}</Text>
        <Text style={styles.rating}>★ {request.passengerRating.toFixed(1)}</Text>
      </View>
      <View style={styles.route}>
        <View style={styles.dotRow}>
          <View style={styles.dot} /><Text style={styles.address} numberOfLines={1}>{request.pickupAddress}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.dotRow}>
          <View style={styles.square} /><Text style={styles.address} numberOfLines={1}>{request.destinationAddress}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.fare}>{formatCurrency(request.estimatedFare)}</Text>
        <Text style={styles.detail}>{(request.estimatedDistance / 1000).toFixed(1)} km · {Math.round(request.estimatedDuration)} min</Text>
      </View>
      <Text style={styles.type}>{request.rideType} · ETA {request.eta} min</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onReject} style={styles.rejectBtn}><Text style={styles.rejectText}>Decline</Text></TouchableOpacity>
        <TouchableOpacity onPress={onAccept} style={styles.acceptBtn}><Text style={styles.acceptText}>Accept</Text></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.xl, padding: spacing.lg, marginHorizontal: spacing.lg, marginBottom: spacing.md, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  passenger: { fontSize: 18, fontWeight: '700', color: colors.text },
  rating: { fontSize: 14, color: colors.rating },
  route: { marginBottom: spacing.md },
  dotRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary, marginRight: spacing.md },
  square: { width: 10, height: 10, backgroundColor: colors.text, marginRight: spacing.md },
  line: { width: 2, height: 16, backgroundColor: colors.border, marginLeft: 4 },
  address: { fontSize: 14, color: colors.text, flex: 1 },
  info: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  fare: { fontSize: 24, fontWeight: '800', color: colors.text },
  detail: { fontSize: 13, color: colors.textSecondary },
  type: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.lg },
  actions: { flexDirection: 'row', gap: spacing.md },
  rejectBtn: { flex: 1, paddingVertical: spacing.md, alignItems: 'center', borderRadius: borderRadius.md, borderWidth: 1.5, borderColor: colors.border },
  rejectText: { fontSize: 15, fontWeight: '600', color: colors.text },
  acceptBtn: { flex: 1, paddingVertical: spacing.md, alignItems: 'center', borderRadius: borderRadius.md, backgroundColor: colors.primary },
  acceptText: { fontSize: 15, fontWeight: '600', color: colors.white },
});
