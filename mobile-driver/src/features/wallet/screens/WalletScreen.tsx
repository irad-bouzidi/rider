import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../shared/components/Button';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { WalletTransaction } from '../../../shared/types/payment';

const MOCK_TXNS: WalletTransaction[] = [
  { id: '1', type: 'earnings', amount: 24.50, description: 'Ride to Downtown', createdAt: new Date().toISOString() },
  { id: '2', type: 'withdrawal', amount: -200.00, description: 'Bank transfer', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', type: 'bonus', amount: 50.00, description: 'Weekend bonus', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export function WalletScreen() {
  const [balance] = useState(450.00);
  const [pending] = useState(75.00);
  const [txns] = useState(MOCK_TXNS);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>Wallet</Text></View>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
        {pending > 0 && <Text style={styles.pending}>{formatCurrency(pending)} pending</Text>}
      </View>
      <Button title="Withdraw funds" variant="outline" onPress={() => {}} style={styles.withdrawBtn} />
      <Text style={styles.sectionTitle}>Transaction History</Text>
      <FlatList data={txns} keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.txnItem}>
            <View style={styles.txnInfo}>
              <Text style={styles.txnIcon}>{item.type === 'earnings' ? '🚗' : item.type === 'withdrawal' ? '🏦' : '🎉'}</Text>
              <View><Text style={styles.txnDesc}>{item.description}</Text><Text style={styles.txnDate}>{new Date(item.createdAt).toLocaleDateString()}</Text></View>
            </View>
            <Text style={[styles.txnAmount, item.amount > 0 ? styles.credit : styles.debit]}>
              {item.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(item.amount))}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  header: { padding: spacing.lg, alignItems: 'center', backgroundColor: colors.background },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  balanceCard: { margin: spacing.lg, padding: spacing.xxl, backgroundColor: colors.primary, borderRadius: borderRadius.xl, alignItems: 'center' },
  balanceLabel: { fontSize: 14, color: colors.textInverse, opacity: 0.8, marginBottom: spacing.sm },
  balanceAmount: { fontSize: 40, fontWeight: '800', color: colors.white },
  pending: { fontSize: 13, color: colors.textInverse, opacity: 0.7, marginTop: spacing.sm },
  withdrawBtn: { marginHorizontal: spacing.lg, marginBottom: spacing.lg },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  list: { paddingHorizontal: spacing.lg },
  txnItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.borderLight },
  txnInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  txnIcon: { fontSize: 20, marginRight: spacing.md },
  txnDesc: { fontSize: 14, color: colors.text },
  txnDate: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  txnAmount: { fontSize: 16, fontWeight: '700' },
  credit: { color: colors.success },
  debit: { color: colors.text },
});
