import { useState, useEffect } from 'react';
import { Coordinates } from '../../../shared/types/location';

export function useDriverLocation(driverId?: string) {
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!driverId) return;

    // Subscribe to driver location updates
    // const unsubscribe = subscribeToDriverLocation(driverId, (loc) => {
    //   setLocation(loc);
    // });
    // return () => unsubscribe();
  }, [driverId]);

  return { driverLocation: location };
}
