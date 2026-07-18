import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDate, formatTime } from '../../../shared/utils/formatDate';
import { RideHistoryItem } from '../types';

interface RideCardProps {
  ride: RideHistoryItem;
  onPress: () => void;
}

export function RideCard({ ride, onPress }: RideCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.routeContainer}>
        <View style={styles.dotContainer}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.square} />
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.address} numberOfLines={1}>
            {ride.pickupAddress}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {ride.destinationAddress}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.date}>
            {formatDate(ride.date)} at {formatTime(ride.date)}
          </Text>
          <Text style={styles.driver}>{ride.driverName}</Text>
        </View>
        <Text style={styles.fare}>{formatCurrency(ride.fare)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  dotContainer: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  square: {
    width: 10,
    height: 10,
    backgroundColor: colors.text,
    marginBottom: 4,
  },
  addressContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  address: {
    fontSize: 14,
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  driver: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  fare: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
});
