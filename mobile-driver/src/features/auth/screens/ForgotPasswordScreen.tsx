import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../shared/components/Button';
import { TextInput } from '../../../shared/components/TextInput';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../validation';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
export function ForgotPasswordScreen() {
  const navigation = useNavigation<any>();
  const [sent, setSent] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: '' },
  });
  if (sent) return (
    <View style={styles.container}>
      <Text style={styles.title}>Check your email</Text>
      <Text style={styles.subtitle}>We've sent a reset link to your email.</Text>
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} style={styles.btn} />
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.subtitle}>Enter your email and we'll send a reset link.</Text>
      <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
        <TextInput label="Email" placeholder="Enter your email" value={value} onChangeText={onChange} error={errors.email?.message} keyboardType="email-address" autoCapitalize="none" />
      )} />
      <Button title="Send Reset Link" onPress={handleSubmit(() => setSent(true))} style={styles.btn} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkContainer}>
        <Text style={styles.linkText}>Remember your password? <Text style={styles.link}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xxl, backgroundColor: colors.background, paddingTop: spacing.huge },
  title: { fontSize: 28, fontWeight: '700', marginBottom: spacing.sm },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: spacing.xxl },
  btn: { marginTop: spacing.lg },
  linkContainer: { marginTop: spacing.xxl, alignItems: 'center' },
  linkText: { fontSize: 14, color: colors.textSecondary },
  link: { color: colors.primary, fontWeight: '600' },
});
