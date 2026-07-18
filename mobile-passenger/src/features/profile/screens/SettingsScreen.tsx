import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem } from '../../../shared/components/ListItem';
import { Divider } from '../../../shared/components/Divider';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

export function SettingsScreen() {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState(true);
  const [shareRide, setShareRide] = useState(false);
  const [showEta, setShowEta] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Share ride status</Text>
            <Switch
              value={shareRide}
              onValueChange={setShareRide}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
          <Divider inset={0} />
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Show ETA</Text>
            <Switch
              value={showEta}
              onValueChange={setShowEta}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <ListItem
            title="Language"
            subtitle="English"
            rightIcon={<Text style={styles.chevron}>›</Text>}
            onPress={() => {}}
          />
          <Divider inset={0} />
          <ListItem
            title="Delete Account"
            rightIcon={<Text style={styles.chevron}>›</Text>}
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
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
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  chevron: {
    fontSize: 24,
    color: colors.textTertiary,
  },
});
