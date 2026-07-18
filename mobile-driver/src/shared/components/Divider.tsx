import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface DividerProps {
  style?: ViewStyle;
  inset?: number;
}

export function Divider({ style, inset }: DividerProps) {
  return (
    <View
      style={[
        styles.divider,
        inset ? { marginLeft: inset } : null,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
});
