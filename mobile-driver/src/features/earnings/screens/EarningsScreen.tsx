import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

const MOCK = {
  today: 145.00, thisWeek: 890.00, thisMonth: 3200.00, total: 15800.00,
  ridesToday: 6, hoursOnline: 4.5,
  dailyBreakdown: [
    { date: '2026-06-09', earnings: 145.00, rides: 6, hours: 4.5 },
    { date: '2026-06-08', earnings: 180.00, rides: 8, hours: 5.2 },
    { date: '2026-06-07', earnings: 95.00, rides: 4, hours: 3.0 },
  ],
};

export function EarningsScreen() {
  const [data] = useState(MOCK);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>Earnings</Text></View>
      <View style={styles.summaryRow}>
        <SummaryCard label="Today" amount={data.today} />
        <SummaryCard label="This Week" amount={data.thisWeek} />
        <SummaryCard label="This Month" amount={data.thisMonth} />
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}><Text style={styles.statValue}>{data.ridesToday}</Text><Text style={styles.statLabel}>Rides</Text></View>
        <View style={styles.stat}><Text style={styles.statValue}>{data.hoursOnline}h</Text><Text style={styles.statLabel}>Online</Text></View>
        <View style={styles.stat}><Text style={styles.statValue}>{formatCurrency(data.total)}</Text><Text style={styles.statLabel}>Total</Text></View>
      </View>
      <Text style={styles.sectionTitle}>Daily Breakdown</Text>
      <FlatList data={data.dailyBreakdown} keyExtractor={(i) => i.date}
        renderItem={({ item }) => (
          <View style={styles.dayRow}>
            <Text style={styles.dayDate}>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</Text>
            <Text style={styles.dayRides}>{item.rides} rides · {item.hours}h</Text>
            <Text style={styles.dayEarnings}>{formatCurrency(item.earnings)}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

function SummaryCard({ label, amount }: { label: string; amount: number }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryAmount}>{formatCurrency(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  header: { padding: spacing.lg, alignItems: 'center', backgroundColor: colors.background },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  summaryRow: { flexDirection: 'row', padding: spacing.lg, gap: spacing.sm },
  summaryCard: { flex: 1, backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: colors.borderLight },
  summaryLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.xs },
  summaryAmount: { fontSize: 18, fontWeight: '800', color: colors.text },
  statsRow: { flexDirection: 'row', marginHorizontal: spacing.lg, backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.borderLight },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md },
  list: { paddingHorizontal: spacing.lg },
  dayRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.lg, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.borderLight },
  dayDate: { flex: 1, fontSize: 14, fontWeight: '500', color: colors.text },
  dayRides: { flex: 1, fontSize: 13, color: colors.textSecondary },
  dayEarnings: { fontSize: 16, fontWeight: '700', color: colors.text },
});
