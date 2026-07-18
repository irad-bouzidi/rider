import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from '../../../shared/components/TextInput';
import { Button } from '../../../shared/components/Button';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';

export function SupportScreen() {
  const navigation = useNavigation<any>();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!subject || !message) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Message sent</Text>
          <Text style={styles.successText}>
            We'll get back to you as soon as possible.
          </Text>
          <Button
            title="Back to profile"
            onPress={() => navigation.goBack()}
            style={styles.successBtn}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.description}>
          Having an issue? Send us a message and we'll help you out.
        </Text>

        <TextInput
          label="Subject"
          placeholder="What's the issue?"
          value={subject}
          onChangeText={setSubject}
        />

        <View style={styles.messageContainer}>
          <Text style={styles.messageLabel}>Message</Text>
          <TextInput
            placeholder="Describe your issue..."
            value={message}
            onChangeText={setMessage}
            multiline
            style={styles.messageInput}
          />
        </View>

        <Button
          title="Send"
          onPress={handleSubmit}
          disabled={!subject || !message}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backBtn: {
    fontSize: 16,
    color: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  form: {
    padding: spacing.xxl,
    paddingTop: spacing.lg,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
    lineHeight: 20,
  },
  messageContainer: {
    marginBottom: spacing.lg,
  },
  messageLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  successIcon: {
    fontSize: 64,
    color: colors.success,
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  successText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  successBtn: {
    width: '100%',
  },
});
