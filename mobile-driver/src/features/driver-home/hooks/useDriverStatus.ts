import { useCallback, useEffect } from 'react';
import { useDriverStore } from '../../../store/driverStore';
import { locationService } from '../../../services/location/LocationService';
import { sendDriverLocation } from '../../../services/websocket/rideSubscription';
export function useDriverStatus() {
  const { isOnline, setOnline } = useDriverStore();
  const toggleOnline = useCallback(async () => {
    if (isOnline) { locationService.stopWatching(); setOnline(false); }
    else {
      const permitted = await locationService.requestPermissions();
      if (!permitted) return;
      locationService.startWatching((loc) => { sendDriverLocation(loc.latitude, loc.longitude); });
      setOnline(true);
    }
  }, [isOnline, setOnline]);
  useEffect(() => { return () => { locationService.stopWatching(); }; }, []);
  return { isOnline, toggleOnline };
}
