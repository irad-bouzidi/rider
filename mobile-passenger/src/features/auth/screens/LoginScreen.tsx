import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { TextInput } from '../../../shared/components/TextInput';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginScreen() {
  const navigation = useNavigation<any>();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      await login(data.email, data.password);
    } catch (e: any) {
      setError(e?.response?.data?.error?.message || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>

      {error && <Text style={styles.error}>{error}</Text>}

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
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      <Button
        title="Log in"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        style={styles.loginButton}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.link}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  error: { color: '#e74c3c', marginBottom: 16, textAlign: 'center' },
  loginButton: { marginTop: 16 },
  linkContainer: { marginTop: 24, alignItems: 'center' },
  linkText: { fontSize: 14, color: '#666' },
  link: { color: '#000', fontWeight: '600' },
});
