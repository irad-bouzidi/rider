import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
interface RideHeaderProps { status: string; passengerName?: string; }
export function RideHeader({ status, passengerName }: RideHeaderProps) {
  const msg: Record<string, string> = { ACCEPTED: 'Heading to pickup', ARRIVED: 'Passenger boarding', IN_PROGRESS: 'On the way to destination', COMPLETED: 'Trip completed' };
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>{msg[status] || status}</Text>
      {passengerName && <Text style={styles.name}>{passengerName}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, backgroundColor: colors.backgroundSecondary, borderRadius: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginBottom: spacing.xs },
  text: { fontSize: 15, fontWeight: '500', color: colors.text },
  name: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
});
