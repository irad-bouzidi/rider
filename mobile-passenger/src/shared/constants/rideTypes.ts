export interface RideTypeConfig {
  id: string;
  nameKey: string;
  icon: string;
  baseFare: number;
  perKm: number;
  perMinute: number;
  minFare: number;
  capacity: number;
  eta: string;
}

export const RIDE_TYPES: RideTypeConfig[] = [
  {
    id: 'standard',
    nameKey: 'ride_types.standard',
    icon: 'car',
    baseFare: 5.0,
    perKm: 1.5,
    perMinute: 0.3,
    minFare: 8.0,
    capacity: 4,
    eta: '3-5',
  },
  {
    id: 'premium',
    nameKey: 'ride_types.premium',
    icon: 'car-sport',
    baseFare: 8.0,
    perKm: 2.5,
    perMinute: 0.5,
    minFare: 12.0,
    capacity: 4,
    eta: '5-8',
  },
  {
    id: 'xl',
    nameKey: 'ride_types.xl',
    icon: 'car-suv',
    baseFare: 10.0,
    perKm: 3.0,
    perMinute: 0.6,
    minFare: 15.0,
    capacity: 6,
    eta: '7-10',
  },
  {
    id: 'economy',
    nameKey: 'ride_types.economy',
    icon: 'car-hatchback',
    baseFare: 3.0,
    perKm: 1.0,
    perMinute: 0.2,
    minFare: 5.0,
    capacity: 4,
    eta: '2-4',
  },
] as const;

export const RIDE_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  ARRIVING: 'ARRIVING',
  ARRIVED: 'ARRIVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type RideStatus = keyof typeof RIDE_STATUS;
