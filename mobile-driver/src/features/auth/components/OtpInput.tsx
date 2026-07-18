import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
interface OtpInputProps { codeLength?: number; onCodeComplete: (code: string) => void; error?: boolean; }
export function OtpInput({ codeLength = 6, onCodeComplete, error }: OtpInputProps) {
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(''));
  const refs = useRef<(TextInput | null)[]>([]);
  const handleChange = (text: string, index: number) => {
    const newCode = [...code]; newCode[index] = text.replace(/[^0-9]/g, '').slice(-1); setCode(newCode);
    if (text && index < codeLength - 1) refs.current[index + 1]?.focus();
    if (newCode.every((c) => c !== '')) onCodeComplete(newCode.join(''));
  };
  return (
    <View style={styles.container}>
      {Array.from({ length: codeLength }, (_, i) => (
        <TextInput key={i} ref={(ref) => { refs.current[i] = ref; }}
          style={[styles.input, code[i] && styles.filled, error && styles.inputError]}
          value={code[i]} onChangeText={(t) => handleChange(t, i)} keyboardType="number-pad" maxLength={1} selectTextOnFocus />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  input: { width: 48, height: 56, borderWidth: 1.5, borderColor: colors.border, borderRadius: borderRadius.md, textAlign: 'center', fontSize: 24, fontWeight: '700', color: colors.text },
  filled: { borderColor: colors.primary }, inputError: { borderColor: colors.error },
});
