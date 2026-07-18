import { useState, useEffect } from 'react';
import { Coordinates } from '../../../shared/types/location';
import { locationService } from '../../../services/location/LocationService';

export function useCurrentLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getLocation() {
      try {
        const coords = await locationService.getCurrentLocation();
        if (mounted) {
          setLocation(coords);
        }
      } catch (e: any) {
        if (mounted) {
          setError(e.message || 'Failed to get location');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getLocation();

    return () => {
      mounted = false;
    };
  }, []);

  return { location, error, loading };
}
