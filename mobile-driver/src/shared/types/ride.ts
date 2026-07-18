import { Coordinates } from './location';
export interface RideRequest {
  id: string; passengerId: string; passengerName: string; passengerRating: number;
  pickup: Coordinates; destination: Coordinates; pickupAddress: string; destinationAddress: string;
  rideType: string; estimatedFare: number; estimatedDistance: number; estimatedDuration: number;
  eta: number; createdAt: string;
}
export interface Ride {
  id: string; passengerId: string; passengerName: string; passengerPhone: string;
  passengerRating: number; passengerPhotoUrl?: string;
  status: 'PENDING' | 'ACCEPTED' | 'ARRIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  pickup: Coordinates; destination: Coordinates; pickupAddress: string; destinationAddress: string;
  rideType: string; estimatedFare: number; actualFare?: number; currency: string;
  distance: number; duration: number; passengerLocation?: Coordinates;
  acceptedAt?: string; startedAt?: string; completedAt?: string;
}
export interface RideRating { rideId: string; rating: number; feedback?: string; tags?: string[]; }
export const RIDE_STATUS = { PENDING: 'PENDING', ACCEPTED: 'ACCEPTED', ARRIVED: 'ARRIVED', IN_PROGRESS: 'IN_PROGRESS', COMPLETED: 'COMPLETED', CANCELLED: 'CANCELLED' } as const;
export type RideStatus = keyof typeof RIDE_STATUS;
