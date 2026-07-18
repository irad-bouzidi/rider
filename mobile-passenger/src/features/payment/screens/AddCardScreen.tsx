import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../shared/components/Button';
import { TextInput } from '../../../shared/components/TextInput';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

const cardSchema = z.object({
  cardNumber: z.string().min(13, 'Invalid card number').max(19),
  expMonth: z.string().length(2, 'MM'),
  expYear: z.string().length(4, 'YYYY'),
  cvc: z.string().min(3, 'Invalid CVC').max(4),
  holderName: z.string().min(2, 'Enter cardholder name'),
});

type CardFormData = z.infer<typeof cardSchema>;

export function AddCardScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  });

  const onSubmit = async (_data: CardFormData) => {
    setLoading(true);
    try {
      // API call
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Card</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="cardNumber"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={value}
              onChangeText={onChange}
              error={errors.cardNumber?.message}
              keyboardType="number-pad"
            />
          )}
        />

        <View style={styles.row}>
          <Controller
            control={control}
            name="expMonth"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Month"
                placeholder="MM"
                value={value}
                onChangeText={onChange}
                error={errors.expMonth?.message}
                keyboardType="number-pad"
                style={styles.halfInput}
              />
            )}
          />
          <Controller
            control={control}
            name="expYear"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Year"
                placeholder="YYYY"
                value={value}
                onChangeText={onChange}
                error={errors.expYear?.message}
                keyboardType="number-pad"
                style={styles.halfInput}
              />
            )}
          />
          <Controller
            control={control}
            name="cvc"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="CVC"
                placeholder="123"
                value={value}
                onChangeText={onChange}
                error={errors.cvc?.message}
                keyboardType="number-pad"
                style={styles.halfInput}
              />
            )}
          />
        </View>

        <Controller
          control={control}
          name="holderName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Cardholder Name"
              placeholder="John Doe"
              value={value}
              onChangeText={onChange}
              error={errors.holderName?.message}
              autoCapitalize="words"
            />
          )}
        />

        <Button
          title="Add Card"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.submitBtn}
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
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  submitBtn: {
    marginTop: spacing.lg,
  },
});
