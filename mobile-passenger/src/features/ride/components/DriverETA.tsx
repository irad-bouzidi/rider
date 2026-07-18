import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

interface DriverETAProps {
  minutes: number;
  distance?: string;
}

export function DriverETA({ minutes, distance }: DriverETAProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.minutes}>{minutes}</Text>
      <Text style={styles.label}>min</Text>
      {distance && <Text style={styles.distance}>{distance} away</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  minutes: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 52,
  },
  label: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: -4,
  },
  distance: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
