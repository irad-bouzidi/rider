import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';

interface SocialLoginButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function SocialLoginButton({
  title,
  onPress,
  style,
}: SocialLoginButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    height: 48,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
});
