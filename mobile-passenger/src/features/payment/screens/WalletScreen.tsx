import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { WalletTransaction } from '../../../shared/types/payment';

const MOCK_TRANSACTIONS: WalletTransaction[] = [
  { id: '1', type: 'debit', amount: 24.50, description: 'Ride to Downtown', rideId: 'r1', createdAt: new Date().toISOString() },
  { id: '2', type: 'credit', amount: 50.00, description: 'Top up', createdAt: new Date().toISOString() },
  { id: '3', type: 'refund', amount: 5.00, description: 'Promo credit', createdAt: new Date().toISOString() },
];

export function WalletScreen() {
  const [balance] = useState(75.50);
  const [transactions] = useState(MOCK_TRANSACTIONS);

  const renderTransaction = ({ item }: { item: WalletTransaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.txnInfo}>
        <Text style={styles.txnType}>
          {item.type === 'credit' ? '💰' : item.type === 'debit' ? '🚗' : '🔄'}
        </Text>
        <View>
          <Text style={styles.txnDesc}>{item.description}</Text>
          <Text style={styles.txnDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.txnAmount,
          item.type === 'credit' || item.type === 'refund'
            ? styles.creditAmount
            : styles.debitAmount,
        ]}
      >
        {item.type === 'credit' || item.type === 'refund' ? '+' : '-'}
        {formatCurrency(item.amount)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={styles.list}
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
    padding: spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  balanceCard: {
    margin: spacing.lg,
    padding: spacing.xxl,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textInverse,
    opacity: 0.8,
    marginBottom: spacing.sm,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: colors.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.lg,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  txnInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  txnType: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  txnDesc: {
    fontSize: 14,
    color: colors.text,
  },
  txnDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  txnAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  creditAmount: {
    color: colors.success,
  },
  debitAmount: {
    color: colors.text,
  },
});
