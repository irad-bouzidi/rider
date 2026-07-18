import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';

interface CurrentLocationButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export function CurrentLocationButton({
  onPress,
  style,
}: CurrentLocationButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>📍</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 200,
    right: spacing.lg,
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 20,
  },
});
