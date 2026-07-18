export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationAddress {
  id: string;
  address: string;
  placeName: string;
  coordinates: Coordinates;
  placeId?: string;
}

export interface SavedLocation {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  type: 'home' | 'work' | 'other';
  icon?: string;
}

export interface SearchResult {
  placeId: string;
  mainText: string;
  secondaryText: string;
  coordinates: Coordinates;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
