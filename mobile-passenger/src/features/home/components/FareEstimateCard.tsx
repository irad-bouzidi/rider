import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { FareEstimate } from '../../../shared/types/ride';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDistance } from '../../../shared/utils/formatDistance';
import { formatDuration } from '../../../shared/utils/formatDate';

interface FareEstimateCardProps {
  estimate: FareEstimate;
}

export function FareEstimateCard({ estimate }: FareEstimateCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Estimated fare</Text>
        <Text style={styles.value}>
          {formatCurrency(estimate.estimatedFare)}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>
          {formatDistance(estimate.distance)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>
          {formatDuration(estimate.duration)}
        </Text>
      </View>

      {estimate.surgeMultiplier > 1 && (
        <View style={styles.surgeContainer}>
          <Text style={styles.surgeText}>
            Surge ×{estimate.surgeMultiplier.toFixed(1)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  surgeContainer: {
    backgroundColor: colors.warningLight,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  surgeText: {
    fontSize: 12,
    color: colors.warning,
    fontWeight: '600',
  },
});
