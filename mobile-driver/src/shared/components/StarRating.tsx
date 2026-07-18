import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  editable?: boolean;
  onRate?: (rating: number) => void;
  style?: ViewStyle;
}

function Star({ filled, size }: { filled: boolean; size: number }) {
  return (
    <View
      style={[
        styles.star,
        {
          width: size,
          height: size,
          borderRadius: size / 4,
          backgroundColor: filled ? colors.rating : colors.border,
        },
      ]}
    />
  );
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 32,
  editable = false,
  onRate,
  style,
}: StarRatingProps) {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: maxStars }, (_, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => editable && onRate?.(i + 1)}
          disabled={!editable}
          activeOpacity={0.7}
        >
          <Star filled={i < rating} size={size} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  star: {},
});
