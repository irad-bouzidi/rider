import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RideCard } from '../components/RideCard';
import { EmptyState } from '../../../shared/components/EmptyState';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { RideHistoryItem } from '../types';

const MOCK_RIDES: RideHistoryItem[] = [
  {
    id: '1', pickupAddress: '123 Home St', destinationAddress: '456 Work Ave',
    date: new Date().toISOString(), fare: 24.50, currency: 'USD',
    status: 'COMPLETED', driverName: 'Alex J.',
  },
  {
    id: '2', pickupAddress: '456 Work Ave', destinationAddress: '789 Park Rd',
    date: new Date(Date.now() - 86400000).toISOString(), fare: 18.00, currency: 'USD',
    status: 'COMPLETED', driverName: 'Sarah M.',
  },
  {
    id: '3', pickupAddress: '789 Park Rd', destinationAddress: '123 Home St',
    date: new Date(Date.now() - 172800000).toISOString(), fare: 32.00, currency: 'USD',
    status: 'COMPLETED', driverName: 'Mike R.',
  },
];

export function RideHistoryScreen() {
  const navigation = useNavigation<any>();
  const [rides] = useState(MOCK_RIDES);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Rides</Text>
      </View>

      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RideCard
            ride={item}
            onPress={() => navigation.navigate('RideDetail', { rideId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            title="No rides yet"
            message="Your ride history will appear here"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
