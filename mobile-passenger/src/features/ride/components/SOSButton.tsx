import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius } from '../../../theme/spacing';

export function SOSButton() {
  const handleSOS = () => {
    Alert.alert(
      'Emergency',
      'Contact emergency services or share your location with emergency contacts.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call 911', style: 'destructive', onPress: () => {} },
        { text: 'Share Location', onPress: () => {} },
      ],
    );
  };

  return (
    <TouchableOpacity
      onPress={handleSOS}
      style={styles.button}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>SOS</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.sos,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: colors.sos,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
});
