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

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Failed to get current location:', error);
      return null;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  startWatching(
    callback: LocationCallback,
    interval: number = 3000,
  ): void {
    if (this.isWatching) return;

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: interval,
        distanceInterval: 10,
      },
      (location) => {
        callback({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      },
    ).then((subscription) => {
      this.watchSubscription = subscription;
      this.isWatching = true;
    });
  }

  stopWatching(): void {
    if (this.watchSubscription) {
      this.watchSubscription.remove();
      this.watchSubscription = null;
    }
    this.isWatching = false;
  }

  get watching(): boolean {
    return this.isWatching;
  }
}

export const locationService = new LocationService();
