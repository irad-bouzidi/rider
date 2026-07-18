import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RatingSheet } from '../components/RatingSheet';
import { Button } from '../../../shared/components/Button';
import { RideStackParamList } from '../../../shared/types/navigation';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

type RideCompleteRoute = RouteProp<RideStackParamList, 'RideComplete'>;

export function RideCompleteScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RideCompleteRoute>();
  const { rideId } = route.params;
  const [rated, setRated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRating = async (rating: number, feedback?: string) => {
    setLoading(true);
    try {
      // API call
      setRated(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  if (rated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.title}>Thank you!</Text>
          <Text style={styles.subtitle}>
            Your feedback helps us improve the experience.
          </Text>
          <View style={styles.receiptContainer}>
            <Text style={styles.receiptTitle}>Trip Receipt</Text>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Total fare</Text>
              <Text style={styles.receiptValue}>{formatCurrency(24.50)}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Distance</Text>
              <Text style={styles.receiptValue}>5.2 km</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Duration</Text>
              <Text style={styles.receiptValue}>15 min</Text>
            </View>
          </View>
          <Button title="Back to home" onPress={handleDone} style={styles.btn} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RatingSheet onSubmit={handleRating} loading={loading} />
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
    padding: spacing.xxl,
  },
  checkmark: {
    fontSize: 64,
    color: colors.success,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  receiptContainer: {
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  receiptLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  receiptValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  btn: {
    width: '100%',
  },
});
