import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DriverInfo } from '../../../shared/types/ride';
import { Avatar } from '../../../shared/components/Avatar';
import { StarRating } from '../../../shared/components/StarRating';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';

interface DriverInfoCardProps {
  driver: DriverInfo;
}

export function DriverInfoCard({ driver }: DriverInfoCardProps) {
  return (
    <View style={styles.container}>
      <Avatar uri={driver.photoUrl} name={driver.fullName} size={56} />
      <View style={styles.info}>
        <Text style={styles.name}>{driver.fullName}</Text>
        <View style={styles.ratingRow}>
          <StarRating rating={Math.round(driver.rating)} size={14} />
          <Text style={styles.ratingText}>{driver.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.vehicle}>
          {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model} ·{' '}
          {driver.vehicle.licensePlate}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
  },
  info: {
    marginLeft: spacing.lg,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  vehicle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
