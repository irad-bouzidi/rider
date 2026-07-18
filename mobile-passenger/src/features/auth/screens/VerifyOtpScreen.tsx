import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Button } from '../../../shared/components/Button';
import { OtpInput } from '../components/OtpInput';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { AuthStackParamList } from '../../../shared/types/navigation';

type VerifyOtpRoute = RouteProp<AuthStackParamList, 'VerifyOtp'>;

export function VerifyOtpScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<VerifyOtpRoute>();
  const { phone, name } = route.params;
  const { verifyOtp, sendOtp, isLoading } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleCodeComplete = async (code: string) => {
    setError(null);
    try {
      const result = await verifyOtp('', code);
      if (result.verified) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }
    } catch (e: any) {
      setError(e?.response?.data?.error?.message || 'Invalid code');
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setCooldown(30);
    try {
      await sendOtp(phone, 'verification');
      setError(null);
    } catch {
      setError('Failed to resend code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your number</Text>
      <Text style={styles.subtitle}>
        Enter the code sent to {phone}
      </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.otpContainer}>
        <OtpInput onCodeComplete={handleCodeComplete} error={!!error} />
      </View>

      <Button
        title={isLoading ? 'Verifying...' : 'Verify'}
        onPress={() => {}}
        loading={isLoading}
        disabled
        style={styles.verifyButton}
      />

      <TouchableOpacity
        onPress={handleResend}
        disabled={cooldown > 0}
        style={styles.resendContainer}
      >
        <Text
          style={[styles.resendText, cooldown > 0 && styles.resendDisabled]}
        >
          {cooldown > 0
            ? `Resend code in ${cooldown}s`
            : 'Resend code'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xxl,
    backgroundColor: colors.background,
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
  otpContainer: {
    marginBottom: spacing.xxl,
  },
  verifyButton: {
    opacity: 0,
    height: 0,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  resendText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  resendDisabled: {
    color: colors.textTertiary,
  },
});
