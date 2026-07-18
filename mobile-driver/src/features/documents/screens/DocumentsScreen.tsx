import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';

interface DocItem { id: string; label: string; status: 'pending' | 'approved' | 'rejected'; icon: string; }

export function DocumentsScreen() {
  const [docs, setDocs] = useState<DocItem[]>([
    { id: 'license', label: "Driver's License", status: 'approved', icon: '🪪' },
    { id: 'identity', label: 'ID Document', status: 'approved', icon: '🆔' },
    { id: 'registration', label: 'Vehicle Registration', status: 'pending', icon: '📄' },
    { id: 'insurance', label: 'Vehicle Insurance', status: 'rejected', icon: '📋' },
    { id: 'photo', label: 'Profile Photo', status: 'approved', icon: '📸' },
  ]);

  const handleUpload = async (docId: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled) {
      setDocs((prev) => prev.map((d) => d.id === docId ? { ...d, status: 'pending' as const } : d));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge label="Approved" variant="success" />;
      case 'rejected': return <Badge label="Rejected" variant="error" />;
      default: return <Badge label="Pending" variant="warning" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}><Text style={styles.backBtn}>← Back</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Documents</Text>
        <View style={{ width: 50 }} />
      </View>
      <Text style={styles.description}>Upload your documents for verification to start driving.</Text>
      {docs.map((doc) => (
        <TouchableOpacity key={doc.id} style={styles.docItem} onPress={() => handleUpload(doc.id)}>
          <Text style={styles.docIcon}>{doc.icon}</Text>
          <View style={styles.docInfo}>
            <Text style={styles.docLabel}>{doc.label}</Text>
            {doc.status === 'rejected' && <Text style={styles.rejectedHint}>Tap to re-upload</Text>}
          </View>
          {getStatusBadge(doc.status)}
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, backgroundColor: colors.background },
  backBtn: { fontSize: 16, color: colors.primary },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  description: { fontSize: 14, color: colors.textSecondary, padding: spacing.lg, lineHeight: 20 },
  docItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, marginHorizontal: spacing.lg, marginBottom: spacing.sm, padding: spacing.lg, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.borderLight },
  docIcon: { fontSize: 24, marginRight: spacing.md },
  docInfo: { flex: 1 },
  docLabel: { fontSize: 15, fontWeight: '500', color: colors.text },
  rejectedHint: { fontSize: 12, color: colors.error, marginTop: 2 },
});
