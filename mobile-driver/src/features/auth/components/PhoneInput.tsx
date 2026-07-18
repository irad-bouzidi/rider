import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
interface PhoneInputProps { value: string; onChangeText: (t: string) => void; error?: string; }
export function PhoneInput({ value, onChangeText, error }: PhoneInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Phone</Text>
      <View style={[styles.row, focused && styles.focused, error && styles.inputError]}>
        <View style={styles.code}><Text style={styles.codeText}>+1</Text></View>
        <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder="(555) 000-0000" placeholderTextColor={colors.textTertiary} keyboardType="phone-pad" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      </View>
      {error && <Text style={styles.err}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg }, label: { fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: colors.border, borderRadius: borderRadius.md, backgroundColor: colors.background },
  focused: { borderColor: colors.primary }, inputError: { borderColor: colors.error },
  code: { paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderRightWidth: 1, borderRightColor: colors.border },
  codeText: { fontSize: 16, fontWeight: '500', color: colors.text },
  input: { flex: 1, fontSize: 16, color: colors.text, paddingVertical: spacing.md, paddingHorizontal: spacing.md, height: 48 },
  err: { fontSize: 12, color: colors.error, marginTop: spacing.xs },
});
