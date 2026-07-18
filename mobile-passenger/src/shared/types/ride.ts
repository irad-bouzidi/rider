import { Coordinates } from './location';
import { RideStatus } from '../constants/rideTypes';

export interface RideRequest {
  pickup: Coordinates;
  destination: Coordinates;
  pickupAddress: string;
  destinationAddress: string;
  rideType: string;
  promoCode?: string;
  paymentMethodId?: string;
}

export interface FareEstimate {
  rideTypeId: string;
  estimatedFare: number;
  minFare: number;
  maxFare: number;
  currency: string;
  distance: number;
  duration: number;
  surgeMultiplier: number;
  breakdown: FareBreakdown;
}

export interface FareBreakdown {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgeFare: number;
  promoDiscount: number;
  total: number;
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  status: RideStatus;
  pickup: Coordinates;
  destination: Coordinates;
  pickupAddress: string;
  destinationAddress: string;
  rideType: string;
  estimatedFare: number;
  actualFare?: number;
  currency: string;
  distance: number;
  duration: number;
  driverLocation?: Coordinates;
  driverEta?: number;
  startedAt?: string;
  acceptedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  rating?: number;
  tip?: number;
  promoDiscount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DriverInfo {
  id: string;
  fullName: string;
  phone: string;
  rating: number;
  totalRides: number;
  photoUrl?: string;
  vehicle: VehicleInfo;
  location: Coordinates;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  photoUrl?: string;
}

export interface RideRating {
  rideId: string;
  rating: number;
  feedback?: string;
  tags?: string[];
}

export interface ActiveRide {
  ride: Ride;
  driver?: DriverInfo;
  status: RideStatus;
  timer: number;
}
