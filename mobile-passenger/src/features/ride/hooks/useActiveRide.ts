import { useEffect, useCallback } from 'react';
import { useActiveRideStore } from '../../../store/activeRideStore';
import { subscribeToRideUpdates, subscribeToDriverLocation } from '../../../services/websocket/rideSubscription';
import { RideStatus } from '../../../shared/constants/rideTypes';

export function useActiveRide(rideId?: string, driverId?: string) {
  const {
    ride,
    driver,
    status,
    timer,
    isActive,
    setRide,
    setDriver,
    setStatus,
    setTimer,
    updateDriverLocation,
    clearActiveRide,
  } = useActiveRideStore();

  useEffect(() => {
    if (!rideId) return;

    const unsubscribeRide = subscribeToRideUpdates(rideId, (data) => {
      if (data.type === 'status_update') {
        setStatus(data.status as RideStatus);
      } else if (data.type === 'ride_data') {
        setRide(data.ride);
      }
    });

    return () => {
      unsubscribeRide();
    };
  }, [rideId, setRide, setStatus]);

  useEffect(() => {
    if (!driverId) return;

    const unsubscribeLocation = subscribeToDriverLocation(driverId, (data) => {
      updateDriverLocation(data.latitude, data.longitude);
    });

    return () => {
      unsubscribeLocation();
    };
  }, [driverId, updateDriverLocation]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, setTimer]);

  const cancelRide = useCallback(async () => {
    clearActiveRide();
  }, [clearActiveRide]);

  const elapsed = timer && ride?.startedAt
    ? Math.floor((timer - new Date(ride.startedAt).getTime()) / 1000)
    : 0;

  return {
    ride,
    driver,
    status,
    elapsed,
    isActive,
    cancelRide,
  };
}
