import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../shared/components/Button';
import { TextInput } from '../../../shared/components/TextInput';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, LoginFormData } from '../validation';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

export function LoginScreen() {
  const navigation = useNavigation<any>();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' },
  });
  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try { await login(data.email, data.password); }
    catch (e: any) { setError(e?.response?.data?.error?.message || 'Login failed'); }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Ride Sharing</Text>
      <Text style={styles.title}>Driver Login</Text>
      <Text style={styles.subtitle}>Sign in to start earning</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
        <TextInput label="Email" placeholder="Enter your email" value={value} onChangeText={onChange} error={errors.email?.message} keyboardType="email-address" autoCapitalize="none" />
      )} />
      <Controller control={control} name="password" render={({ field: { onChange, value } }) => (
        <TextInput label="Password" placeholder="Enter your password" value={value} onChangeText={onChange} error={errors.password?.message} secureTextEntry />
      )} />
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}><Text style={styles.forgot}>Forgot password?</Text></TouchableOpacity>
      <Button title="Sign in" onPress={handleSubmit(onSubmit)} loading={isLoading} style={styles.loginBtn} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.link}>Sign up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xxl, justifyContent: 'center', backgroundColor: colors.background },
  brand: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: spacing.xxl, letterSpacing: 2 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: spacing.xs },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: spacing.xxl },
  error: { color: colors.error, marginBottom: spacing.lg, textAlign: 'center' },
  forgot: { fontSize: 14, color: colors.primary, fontWeight: '500', marginBottom: spacing.lg, textAlign: 'right' },
  loginBtn: { marginTop: spacing.sm },
  linkContainer: { marginTop: spacing.xxl, alignItems: 'center' },
  linkText: { fontSize: 14, color: colors.textSecondary },
  link: { color: colors.primary, fontWeight: '600' },
});
