import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import MapViewRN, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';
import { Coordinates, MapRegion } from '../../../shared/types/location';

interface MapViewProps {
  region: MapRegion;
  onRegionChange?: (region: MapRegion) => void;
  onPress?: (coordinate: Coordinates) => void;
  markers?: {
    coordinate: Coordinates;
    title?: string;
    description?: string;
    pinColor?: string;
  }[];
  showsUserLocation?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function MapView({
  region,
  onRegionChange,
  onPress,
  markers,
  showsUserLocation = true,
  style,
  children,
}: MapViewProps) {
  return (
    <MapViewRN
      provider={PROVIDER_GOOGLE}
      style={[styles.map, style]}
      initialRegion={region as Region}
      onRegionChangeComplete={onRegionChange as any}
      onPress={(e) => onPress?.(e.nativeEvent.coordinate as Coordinates)}
      showsUserLocation={showsUserLocation}
      showsMyLocationButton
      showsCompass
      rotateEnabled
    >
      {markers?.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate as any}
          title={marker.title}
          description={marker.description}
          pinColor={marker.pinColor}
        />
      ))}
      {children}
    </MapViewRN>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
