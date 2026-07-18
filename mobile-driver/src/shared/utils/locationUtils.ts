import { Coordinates } from '../types/location';

const EARTH_RADIUS_METERS = 6371000;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  const lat1 = toRadians(point1.latitude);
  const lon1 = toRadians(point1.longitude);
  const lat2 = toRadians(point2.latitude);
  const lon2 = toRadians(point2.longitude);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

export function calculateBearing(point1: Coordinates, point2: Coordinates): number {
  const lat1 = toRadians(point1.latitude);
  const lon1 = toRadians(point1.longitude);
  const lat2 = toRadians(point2.latitude);
  const lon2 = toRadians(point2.longitude);

  const dlon = lon2 - lon1;

  const y = Math.sin(dlon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dlon);

  const bearing = Math.atan2(y, x);
  return ((bearing * 180) / Math.PI + 360) % 360;
}

export function midpoint(point1: Coordinates, point2: Coordinates): Coordinates {
  const lat1 = toRadians(point1.latitude);
  const lon1 = toRadians(point1.longitude);
  const lat2 = toRadians(point2.latitude);
  const lon2 = toRadians(point2.longitude);

  const dlon = lon2 - lon1;

  const x = Math.cos(lat2) * Math.cos(dlon);
  const y = Math.cos(lat2) * Math.sin(dlon);

  const lat3 = Math.atan2(
    Math.sin(lat1) + Math.sin(lat2),
    Math.sqrt((Math.cos(lat1) + x) * (Math.cos(lat1) + x) + y * y),
  );
  const lon3 = lon1 + Math.atan2(y, Math.cos(lat1) + x);

  return {
    latitude: (lat3 * 180) / Math.PI,
    longitude: (lon3 * 180) / Math.PI,
  };
}

export function isPointInRegion(
  point: Coordinates,
  center: Coordinates,
  radiusMeters: number,
): boolean {
  return calculateDistance(point, center) <= radiusMeters;
}
