import { Coordinates, MapRegion } from '../types/location';

export function calculateRegion(
  coordinates: Coordinates[],
  padding: number = 0.1,
): MapRegion {
  if (coordinates.length === 0) {
    return {
      latitude: 40.7128,
      longitude: -74.006,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  const latitudes = coordinates.map((c) => c.latitude);
  const longitudes = coordinates.map((c) => c.longitude);

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  const latDelta = (maxLat - minLat) * (1 + padding);
  const lngDelta = (maxLng - minLng) * (1 + padding);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max(latDelta, 0.01),
    longitudeDelta: Math.max(lngDelta, 0.01),
  };
}

export function defaultRegion(): MapRegion {
  return {
    latitude: 40.7128,
    longitude: -74.006,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
}
