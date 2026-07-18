import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { RIDE_TYPES, RideTypeConfig } from '../../../shared/constants/rideTypes';
import { FareEstimate } from '../../../shared/types/ride';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

interface RideTypeSelectorProps {
  selectedType: string | null;
  onSelectType: (type: RideTypeConfig) => void;
  fareEstimates?: FareEstimate[];
  pickupSet: boolean;
  destinationSet: boolean;
}

export function RideTypeSelector({
  selectedType,
  onSelectType,
  fareEstimates,
  pickupSet,
  destinationSet,
}: RideTypeSelectorProps) {
  const getFareForType = (typeId: string): FareEstimate | undefined => {
    return fareEstimates?.find((f) => f.rideTypeId === typeId);
  };

  if (!pickupSet || !destinationSet) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={RIDE_TYPES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedType === item.id;
          const fare = getFareForType(item.id);

          return (
            <TouchableOpacity
              style={[
                styles.card,
                isSelected && styles.cardSelected,
              ]}
              onPress={() => onSelectType(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.carIcon}>
                {item.id === 'standard' ? '🚗' : item.id === 'premium' ? '🏎️' : item.id === 'xl' ? '🚙' : '🚕'}
              </Text>
              <Text
                style={[
                  styles.typeName,
                  isSelected && styles.typeNameSelected,
                ]}
              >
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </Text>
              <Text
                style={[
                  styles.fare,
                  isSelected && styles.fareSelected,
                ]}
              >
                {fare
                  ? formatCurrency(fare.estimatedFare)
                  : '—'}
              </Text>
              <Text style={styles.eta}>{item.eta} min</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#f8f8f8',
  },
  carIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  typeNameSelected: {
    color: colors.primary,
  },
  fare: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  fareSelected: {
    color: colors.primary,
  },
  eta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
