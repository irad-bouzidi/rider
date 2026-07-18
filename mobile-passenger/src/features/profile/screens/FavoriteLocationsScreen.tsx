import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState } from '../../../shared/components/EmptyState';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { SavedLocation } from '../../../shared/types/location';

const MOCK_LOCATIONS: SavedLocation[] = [
  { id: '1', name: 'Home', address: '123 Home St', coordinates: { latitude: 40.7128, longitude: -74.006 }, type: 'home' },
  { id: '2', name: 'Work', address: '456 Work Ave', coordinates: { latitude: 40.7580, longitude: -73.9855 }, type: 'work' },
];

export function FavoriteLocationsScreen() {
  const navigation = useNavigation<any>();
  const [locations] = useState(MOCK_LOCATIONS);

  const renderItem = ({ item }: { item: SavedLocation }) => (
    <TouchableOpacity style={styles.locationItem}>
      <View style={styles.locationIcon}>
        <Text style={styles.locationEmoji}>
          {item.type === 'home' ? '🏠' : item.type === 'work' ? '🏢' : '📍'}
        </Text>
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationAddress}>{item.address}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorite Locations</Text>
        <View style={{ width: 50 }} />
      </View>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            title="No saved locations"
            message="Save your home and work addresses for quick access"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
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
  list: {
    padding: spacing.lg,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  locationEmoji: {
    fontSize: 20,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  locationAddress: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: colors.textTertiary,
  },
});
