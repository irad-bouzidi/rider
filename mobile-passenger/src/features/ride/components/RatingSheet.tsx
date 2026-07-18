import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from '../../../shared/components/Button';
import { StarRating } from '../../../shared/components/StarRating';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';

interface RatingSheetProps {
  onSubmit: (rating: number, feedback?: string) => void;
  loading?: boolean;
}

const RATING_TAGS = [
  'Friendly', 'Punctual', 'Clean car', 'Safe driving',
  'Good conversation', 'Professional',
];

export function RatingSheet({ onSubmit, loading }: RatingSheetProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = () => {
    if (rating === 0) return;
    const feedbackText = [feedback, ...selectedTags].filter(Boolean).join('. ');
    onSubmit(rating, feedbackText);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate your ride</Text>
      <Text style={styles.subtitle}>How was your trip?</Text>

      <View style={styles.starsContainer}>
        <StarRating
          rating={rating}
          size={40}
          editable
          onRate={setRating}
        />
      </View>

      {rating > 0 && (
        <>
          <View style={styles.tagsContainer}>
            {RATING_TAGS.map((tag) => (
              <TouchableButton
                key={tag}
                title={tag}
                selected={selectedTags.includes(tag)}
                onPress={() => toggleTag(tag)}
              />
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor={colors.textTertiary}
            value={feedback}
            onChangeText={setFeedback}
            multiline
            maxLength={200}
          />

          <Button
            title="Submit"
            onPress={handleSubmit}
            loading={loading}
            disabled={rating === 0}
          />
        </>
      )}
    </View>
  );
}

function TouchableButton({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tag, selected && styles.tagSelected]}
    >
      <Text style={[styles.tagText, selected && styles.tagTextSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  starsContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tag: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tagSelected: {
    borderColor: colors.primary,
    backgroundColor: '#f8f8f8',
  },
  tagText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  tagTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 14,
    color: colors.text,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: spacing.lg,
  },
});
