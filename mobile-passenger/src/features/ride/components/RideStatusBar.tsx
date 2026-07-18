import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

interface RideStatusBarProps {
  status: string;
  driverName?: string;
  eta?: number;
}

export function RideStatusBar({ status, driverName, eta }: RideStatusBarProps) {
  const getStatusText = () => {
    switch (status) {
      case 'SEARCHING':
        return 'Finding your driver...';
      case 'ACCEPTED':
        return `${driverName || 'Your driver'} is on the way`;
      case 'ARRIVING':
        return `Driver is arriving in ${eta || 1} min`;
      case 'ARRIVED':
        return 'Your driver has arrived';
      case 'IN_PROGRESS':
        return 'On your way';
      case 'COMPLETED':
        return 'Trip completed';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>{getStatusText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
});
