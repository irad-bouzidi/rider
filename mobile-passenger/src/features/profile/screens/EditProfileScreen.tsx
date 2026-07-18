import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../shared/components/Button';
import { TextInput } from '../../../shared/components/TextInput';
import { Avatar } from '../../../shared/components/Avatar';
import { useAuthStore } from '../../../store/authStore';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function EditProfileScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (_data: ProfileFormData) => {
    setLoading(true);
    try {
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.avatarSection}>
        <Avatar uri={user?.photoUrl} name={user?.fullName || 'U'} size={96} />
        <TouchableOpacity style={styles.changePhotoBtn}>
          <Text style={styles.changePhotoText}>Change photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Full Name"
              value={value}
              onChangeText={onChange}
              error={errors.fullName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Email"
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
              label="Phone"
              value={value}
              onChangeText={onChange}
              error={errors.phone?.message}
              keyboardType="phone-pad"
            />
          )}
        />
        <Button
          title="Save Changes"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.saveBtn}
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  changePhotoBtn: {
    marginTop: spacing.md,
  },
  changePhotoText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: spacing.xxl,
  },
  saveBtn: {
    marginTop: spacing.lg,
  },
});
