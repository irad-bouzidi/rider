import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';
import { SearchResult } from '../../../shared/types/location';

interface LocationSearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  results: SearchResult[];
  onSelectResult: (result: SearchResult) => void;
  isSearching?: boolean;
  icon?: React.ReactNode;
}

export function LocationSearchBar({
  placeholder,
  value,
  onChangeText,
  onClear,
  results,
  onSelectResult,
  isSearching,
  icon,
}: LocationSearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.placeId}
          style={styles.resultsList}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => onSelectResult(item)}
            >
              <Text style={styles.resultMain}>{item.mainText}</Text>
              <Text style={styles.resultSecondary}>{item.secondaryText}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    height: 48,
  },
  icon: {
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: spacing.xs,
  },
  clearText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  resultsList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginTop: spacing.xs,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    maxHeight: 200,
  },
  resultItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  resultMain: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  resultSecondary: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
