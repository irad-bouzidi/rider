import { Coordinates } from '../../shared/types/location';

export interface HomeState {
  pickup: LocationResult | null;
  destination: LocationResult | null;
  selectedRideType: string | null;
}

export interface LocationResult {
  address: string;
  coordinates: Coordinates;
  placeId?: string;
}

export interface MapViewRef {
  animateToRegion: (region: any, duration?: number) => void;
  fitToCoordinates: (coordinates: Coordinates[], options?: any) => void;
}
