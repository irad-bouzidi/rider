import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../shared/components/Button';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

export function RideCompleteScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.check}>✓</Text>
        <Text style={styles.title}>Trip Complete</Text>
        <View style={styles.receipt}>
          <Text style={styles.earned}>You earned</Text>
          <Text style={styles.amount}>{formatCurrency(18.50)}</Text>
        </View>
        <Button title="Back to home" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })} style={styles.btn} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxl },
  check: { fontSize: 64, color: colors.success, marginBottom: spacing.lg },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: spacing.xxl },
  receipt: { alignItems: 'center', marginBottom: spacing.xxl },
  earned: { fontSize: 16, color: colors.textSecondary },
  amount: { fontSize: 48, fontWeight: '800', color: colors.text },
  btn: { width: '100%' },
});
