export interface Driver {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  rating: number;
  totalRides: number;
  totalEarnings: number;
  photoUrl?: string;
  vehicle: DriverVehicle;
  status: DriverStatus;
  location: { latitude: number; longitude: number };
  isOnline: boolean;
}

export interface DriverVehicle {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  type: string;
  photoUrl?: string;
}

export type DriverStatus = 'available' | 'busy' | 'offline' | 'on_trip';
