import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../../../shared/components/Avatar';
import { ListItem } from '../../../shared/components/ListItem';
import { Divider } from '../../../shared/components/Divider';
import { useAuthStore } from '../../../store/authStore';
import { useAuth } from '../../auth/hooks/useAuth';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';

export function ProfileScreen() {
  const navigation = useNavigation<any>();
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();

  const menuItems = [
    { title: 'Edit Profile', icon: '✏️', screen: 'EditProfile' },
    { title: 'Favorite Locations', icon: '⭐', screen: 'FavoriteLocations' },
    { title: 'Payment Methods', icon: '💳', screen: 'PaymentMethods' },
    { title: 'Wallet', icon: '💰', screen: 'Wallet' },
    { title: 'Settings', icon: '⚙️', screen: 'Settings' },
    { title: 'Support', icon: '💬', screen: 'Support' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <Avatar
          uri={user?.photoUrl}
          name={user?.fullName || 'User'}
          size={72}
        />
        <Text style={styles.name}>{user?.fullName || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
        <Text style={styles.phone}>{user?.phone || ''}</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.screen}>
            <ListItem
              title={item.title}
              leftIcon={<Text>{item.icon}</Text>}
              rightIcon={<Text style={styles.chevron}>›</Text>}
              onPress={() => navigation.navigate(item.screen)}
            />
            {index < menuItems.length - 1 && <Divider inset={60} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
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
    padding: spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  profileCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  phone: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menu: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  chevron: {
    fontSize: 24,
    color: colors.textTertiary,
  },
  footer: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  logoutText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: '600',
  },
});
