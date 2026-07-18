import { create } from 'zustand';
import { Ride, DriverInfo } from '../shared/types/ride';
import { RideStatus } from '../shared/constants/rideTypes';

interface ActiveRideState {
  ride: Ride | null;
  driver: DriverInfo | null;
  status: RideStatus | null;
  timer: number;
  isActive: boolean;

  setRide: (ride: Ride) => void;
  setDriver: (driver: DriverInfo) => void;
  setStatus: (status: RideStatus) => void;
  setTimer: (timer: number) => void;
  updateDriverLocation: (latitude: number, longitude: number) => void;
  clearActiveRide: () => void;
}

export const useActiveRideStore = create<ActiveRideState>((set) => ({
  ride: null,
  driver: null,
  status: null,
  timer: 0,
  isActive: false,

  setRide: (ride) => set({ ride, isActive: true }),

  setDriver: (driver) => set({ driver }),

  setStatus: (status) => set({ status }),

  setTimer: (timer) => set({ timer }),

  updateDriverLocation: (latitude, longitude) =>
    set((state) => ({
      ride: state.ride
        ? { ...state.ride, driverLocation: { latitude, longitude } }
        : null,
      driver: state.driver
        ? { ...state.driver, location: { latitude, longitude } }
        : null,
    })),

  clearActiveRide: () =>
    set({
      ride: null,
      driver: null,
      status: null,
      timer: 0,
      isActive: false,
    }),
}));
