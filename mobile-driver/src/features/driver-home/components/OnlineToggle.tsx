import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
interface OnlineToggleProps { isOnline: boolean; onToggle: () => void; }
export function OnlineToggle({ isOnline, onToggle }: OnlineToggleProps) {
  return (
    <TouchableOpacity onPress={onToggle} style={[styles.button, isOnline ? styles.online : styles.offline]} activeOpacity={0.8}>
      <Text style={styles.dot}>{isOnline ? '●' : '○'}</Text>
      <Text style={styles.text}>{isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.xxl, borderRadius: borderRadius.full, gap: spacing.sm },
  online: { backgroundColor: colors.online },
  offline: { backgroundColor: colors.textTertiary },
  dot: { fontSize: 16, color: colors.white },
  text: { fontSize: 16, fontWeight: '700', color: colors.white, letterSpacing: 1 },
});
