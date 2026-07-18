import { create } from 'zustand';
import { RideRequest, Ride } from '../shared/types/ride';

interface RideState {
  pendingRequests: RideRequest[]; activeRide: Ride | null;
  setPendingRequests: (requests: RideRequest[]) => void;
  addPendingRequest: (request: RideRequest) => void;
  removePendingRequest: (id: string) => void;
  setActiveRide: (ride: Ride | null) => void;
  clearAll: () => void;
}

export const useRideStore = create<RideState>((set) => ({
  pendingRequests: [], activeRide: null,
  setPendingRequests: (requests) => set({ pendingRequests: requests }),
  addPendingRequest: (request) => set((s) => ({ pendingRequests: [...s.pendingRequests, request] })),
  removePendingRequest: (id) => set((s) => ({ pendingRequests: s.pendingRequests.filter((r) => r.id !== id) })),
  setActiveRide: (ride) => set({ activeRide: ride }),
  clearAll: () => set({ pendingRequests: [], activeRide: null }),
}));
