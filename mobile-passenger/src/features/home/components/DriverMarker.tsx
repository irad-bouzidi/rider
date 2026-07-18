import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { Coordinates } from '../../../shared/types/location';
import { colors } from '../../../theme/colors';

interface DriverMarkerProps {
  coordinate: Coordinates;
  heading?: number;
}

export function DriverMarker({ coordinate, heading }: DriverMarkerProps) {
  return (
    <Marker
      coordinate={coordinate as any}
      flat
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View style={styles.container}>
        <Text style={styles.icon}>🚗</Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
  },
});
