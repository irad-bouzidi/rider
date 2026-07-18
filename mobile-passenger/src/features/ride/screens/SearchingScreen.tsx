import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRideStore } from '../../../store/rideStore';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

export function SearchingScreen() {
  const navigation = useNavigation<any>();
  const { pickupAddress, destinationAddress, selectedRideType, fareEstimate } = useRideStore();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCancel = () => {
    useRideStore.getState().setIsSearching(false);
    navigation.goBack();
  };

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
        <Text style={styles.title}>Finding your driver</Text>
        <Text style={styles.subtitle}>
          Searching for nearby drivers...
        </Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.tripInfo}>
          <View style={styles.locationRow}>
            <View style={styles.dotOuter}>
              <View style={styles.dotPickup} />
            </View>
            <Text style={styles.locationText} numberOfLines={1}>
              {pickupAddress}
            </Text>
          </View>
          <View style={styles.locationLine} />
          <View style={styles.locationRow}>
            <View style={styles.square} />
            <Text style={styles.locationText} numberOfLines={1}>
              {destinationAddress}
            </Text>
          </View>
        </View>

        {fareEstimate && (
          <Text style={styles.fare}>
            {selectedRideType} · {formatCurrency(fareEstimate.estimatedFare)}
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel request</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  spinner: {
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  timerContainer: {
    marginBottom: spacing.xxl,
  },
  timer: {
    fontSize: 36,
    fontWeight: '300',
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  tripInfo: {
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotOuter: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  dotPickup: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  square: {
    width: 10,
    height: 10,
    backgroundColor: colors.text,
    marginRight: spacing.md,
    marginLeft: 5,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 9,
  },
  locationText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  fare: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  cancelButton: {
    marginHorizontal: spacing.xxl,
    marginBottom: spacing.xxl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.error,
    borderRadius: borderRadius.lg,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
  },
});
