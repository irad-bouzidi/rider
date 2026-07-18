import { create } from 'zustand';
import { Coordinates } from '../shared/types/location';
import { FareEstimate } from '../shared/types/ride';

interface RideState {
  pickup: Coordinates | null;
  destination: Coordinates | null;
  pickupAddress: string;
  destinationAddress: string;
  selectedRideType: string | null;
  fareEstimate: FareEstimate | null;
  isSearching: boolean;

  setPickup: (pickup: Coordinates, address: string) => void;
  setDestination: (destination: Coordinates, address: string) => void;
  setSelectedRideType: (type: string) => void;
  setFareEstimate: (estimate: FareEstimate) => void;
  setIsSearching: (searching: boolean) => void;
  clearRide: () => void;
}

export const useRideStore = create<RideState>((set) => ({
  pickup: null,
  destination: null,
  pickupAddress: '',
  destinationAddress: '',
  selectedRideType: null,
  fareEstimate: null,
  isSearching: false,

  setPickup: (pickup, address) =>
    set({ pickup, pickupAddress: address }),

  setDestination: (destination, address) =>
    set({ destination, destinationAddress: address }),

  setSelectedRideType: (type) =>
    set({ selectedRideType: type }),

  setFareEstimate: (estimate) =>
    set({ fareEstimate: estimate }),

  setIsSearching: (searching) =>
    set({ isSearching: searching }),

  clearRide: () =>
    set({
      pickup: null,
      destination: null,
      pickupAddress: '',
      destinationAddress: '',
      selectedRideType: null,
      fareEstimate: null,
      isSearching: false,
    }),
}));
