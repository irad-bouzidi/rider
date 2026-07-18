import { create } from 'zustand';
import { DriverProfile, DriverEarnings } from '../shared/types/driver';

interface DriverState {
  profile: DriverProfile | null; earnings: DriverEarnings | null; isOnline: boolean;
  setProfile: (profile: DriverProfile) => void;
  updateLocation: (latitude: number, longitude: number) => void;
  setOnline: (online: boolean) => void;
  setEarnings: (earnings: DriverEarnings) => void;
  clearDriver: () => void;
}

export const useDriverStore = create<DriverState>((set) => ({
  profile: null, earnings: null, isOnline: false,
  setProfile: (profile) => set({ profile }),
  updateLocation: (latitude, longitude) => set((state) => ({
    profile: state.profile ? { ...state.profile, currentLocation: { latitude, longitude } } : null,
  })),
  setOnline: (online) => set({ isOnline: online }),
  setEarnings: (earnings) => set({ earnings }),
  clearDriver: () => set({ profile: null, earnings: null, isOnline: false }),
}));
