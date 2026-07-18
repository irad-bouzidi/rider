import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { colors } from '../../theme/colors';

export function NetworkStatusBar() {
  const isConnected = useNetworkStatus();

  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No internet connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.error,
    paddingVertical: 6,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
