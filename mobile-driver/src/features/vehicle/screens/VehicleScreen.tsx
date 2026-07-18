import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { TextInput } from '../../../shared/components/TextInput';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

const vehicleSchema = z.object({
  make: z.string().min(1, 'Required'), model: z.string().min(1, 'Required'),
  year: z.string().min(4, 'Required'), color: z.string().min(1, 'Required'),
  licensePlate: z.string().min(2, 'Required'), type: z.string().min(1, 'Required'),
});

export function VehicleScreen() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(vehicleSchema) });
  const onSubmit = async () => { setLoading(true); setTimeout(() => setLoading(false), 1000); };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}><Text style={styles.backBtn}>← Back</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Vehicle</Text>
        <View style={{ width: 50 }} />
      </View>
      <View style={styles.form}>
        <Controller control={control} name="make" render={({ field: { onChange, value } }) => (
          <TextInput label="Make" placeholder="e.g. Toyota" value={value} onChangeText={onChange} error={errors.make?.message as string} />
        )} />
        <Controller control={control} name="model" render={({ field: { onChange, value } }) => (
          <TextInput label="Model" placeholder="e.g. Camry" value={value} onChangeText={onChange} error={errors.model?.message as string} />
        )} />
        <View style={styles.row}>
          <Controller control={control} name="year" render={({ field: { onChange, value } }) => (
            <TextInput label="Year" placeholder="2024" value={value} onChangeText={onChange} error={errors.year?.message as string} keyboardType="number-pad" style={{ flex: 1 }} />
          )} />
          <Controller control={control} name="color" render={({ field: { onChange, value } }) => (
            <TextInput label="Color" placeholder="White" value={value} onChangeText={onChange} error={errors.color?.message as string} style={{ flex: 1 }} />
          )} />
        </View>
        <Controller control={control} name="licensePlate" render={({ field: { onChange, value } }) => (
          <TextInput label="License Plate" placeholder="ABC 1234" value={value} onChangeText={onChange} error={errors.licensePlate?.message as string} autoCapitalize="characters" />
        )} />
        <Controller control={control} name="type" render={({ field: { onChange, value } }) => (
          <TextInput label="Vehicle Type" placeholder="e.g. sedan, suv" value={value} onChangeText={onChange} error={errors.type?.message as string} />
        )} />
        <Button title="Save Vehicle" onPress={handleSubmit(onSubmit)} loading={loading} style={styles.saveBtn} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  backBtn: { fontSize: 16, color: colors.primary },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  form: { padding: spacing.xxl },
  row: { flexDirection: 'row', gap: spacing.md },
  saveBtn: { marginTop: spacing.lg },
});
