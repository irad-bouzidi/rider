import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../shared/components/Button';
import { TextInput } from '../../../shared/components/TextInput';
import { useAuth } from '../hooks/useAuth';
import { registerSchema, RegisterFormData } from '../validation';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

export function RegisterScreen() {
  const navigation = useNavigation<any>();
  const { register, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    try {
      await register(data);
    } catch (e: any) {
      setError(e?.response?.data?.error?.message || 'Registration failed');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={value}
            onChangeText={onChange}
            error={errors.fullName?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={value}
            onChangeText={onChange}
            error={errors.phone?.message}
            keyboardType="phone-pad"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            placeholder="Create a password"
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={value}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
            secureTextEntry
          />
        )}
      />

      <Button
        title="Sign up"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={styles.signupButton}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          Already have an account?{' '}
          <Text style={styles.link}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xxl,
    paddingTop: spacing.huge,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  error: {
    color: colors.error,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  signupButton: {
    marginTop: spacing.lg,
  },
  linkContainer: {
    marginTop: spacing.xxl,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
});
