import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../shared/components/Button';
import { EmptyState } from '../../../shared/components/EmptyState';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { PaymentMethod } from '../../../shared/types/payment';

const MOCK_METHODS: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    label: 'Visa ending in 4242',
    isDefault: true,
    card: { brand: 'Visa', last4: '4242', expMonth: 12, expYear: 2026, holderName: 'John Doe' },
  },
  {
    id: '2',
    type: 'wallet',
    label: 'Wallet balance',
    isDefault: false,
  },
];

export function PaymentMethodsScreen() {
  const navigation = useNavigation<any>();
  const [methods] = useState<PaymentMethod[]>(MOCK_METHODS);

  const renderItem = ({ item }: { item: PaymentMethod }) => (
    <TouchableOpacity style={styles.methodItem}>
      <View style={styles.methodInfo}>
        <Text style={styles.methodIcon}>
          {item.type === 'card' ? '💳' : item.type === 'wallet' ? '💰' : '💵'}
        </Text>
        <View style={styles.methodText}>
          <Text style={styles.methodLabel}>{item.label}</Text>
          {item.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
        </View>
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 50 }} />
      </View>

      <FlatList
        data={methods}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState
            title="No payment methods"
            message="Add a card or payment method to get started"
            actionLabel="Add payment method"
            onAction={() => {}}
          />
        }
      />

      <View style={styles.footer}>
        <Button
          title="Add payment method"
          onPress={() => navigation.navigate('AddCard')}
          variant="outline"
        />
      </View>
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
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  methodText: {
    flex: 1,
  },
  methodLabel: {
    fontSize: 16,
    color: colors.text,
  },
  defaultBadge: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: colors.textTertiary,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
});
