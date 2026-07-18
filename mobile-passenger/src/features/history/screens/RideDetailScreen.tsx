import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarRating } from '../../../shared/components/StarRating';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDate, formatTime } from '../../../shared/utils/formatDate';

export function RideDetailScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip Details</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.routeCard}>
        <View style={styles.routeRow}>
          <View style={styles.dotPickup} />
          <Text style={styles.routeAddress}>123 Home St</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeRow}>
          <View style={styles.square} />
          <Text style={styles.routeAddress}>456 Work Ave</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <InfoRow label="Date" value={formatDate(new Date().toISOString())} />
        <InfoRow label="Time" value={formatTime(new Date().toISOString())} />
        <InfoRow label="Driver" value="Alex Johnson" />
        <InfoRow label="Vehicle" value="White Toyota Camry · ABC 1234" />
        <InfoRow label="Distance" value="5.2 km" />
        <InfoRow label="Duration" value="15 min" />
        <InfoRow label="Fare" value={formatCurrency(24.50)} isBold />
      </View>

      <View style={styles.ratingCard}>
        <Text style={styles.ratingTitle}>Your Rating</Text>
        <StarRating rating={5} size={28} />
      </View>
    </SafeAreaView>
  );
}

function InfoRow({ label, value, isBold }: { label: string; value: string; isBold?: boolean }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, isBold && styles.infoValueBold]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  backBtn: {
    fontSize: 16,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  routeCard: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotPickup: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  square: {
    width: 10,
    height: 10,
    backgroundColor: colors.text,
    marginRight: spacing.md,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 4,
  },
  routeAddress: {
    fontSize: 16,
    color: colors.text,
  },
  infoCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
  },
  infoValueBold: {
    fontWeight: '700',
    fontSize: 16,
  },
  ratingCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
});
