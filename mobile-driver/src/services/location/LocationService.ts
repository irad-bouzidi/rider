import * as Location from 'expo-location';
import { Coordinates } from '../../shared/types/location';

type LocationCallback = (location: Coordinates) => void;

class LocationService {
  private watchSubscription: Location.LocationSubscription | null = null;
  private isWatching = false;

  async getCurrentLocation(): Promise<Coordinates | null> {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') return null;
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      return { latitude: location.coords.latitude, longitude: location.coords.longitude };
    } catch { return null; }
  }

  async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  startWatching(callback: LocationCallback, interval: number = 3000) {
    if (this.isWatching) return;
    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: interval, distanceInterval: 10 },
      (loc) => callback({ latitude: loc.coords.latitude, longitude: loc.coords.longitude }),
    ).then((sub) => { this.watchSubscription = sub; this.isWatching = true; });
  }

  stopWatching() {
    if (this.watchSubscription) { this.watchSubscription.remove(); this.watchSubscription = null; }
    this.isWatching = false;
  }

  get watching() { return this.isWatching; }
}

export const locationService = new LocationService();
