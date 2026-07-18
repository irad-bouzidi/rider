import { Coordinates } from './location';
export interface DriverProfile {
  id: string; fullName: string; email: string; phone: string; photoUrl?: string;
  rating: number; totalRides: number; totalEarnings: number; isOnline: boolean;
  status: 'available' | 'busy' | 'offline'; currentLocation: Coordinates;
  documentsStatus: DocumentsStatus; vehicle: DriverVehicle;
}
export interface DriverVehicle {
  id: string; make: string; model: string; year: number; color: string;
  licensePlate: string; type: string; photoUrl?: string;
}
export interface DocumentsStatus {
  driversLicense: 'pending' | 'approved' | 'rejected';
  identityDocument: 'pending' | 'approved' | 'rejected';
  vehicleRegistration: 'pending' | 'approved' | 'rejected';
  vehicleInsurance: 'pending' | 'approved' | 'rejected';
  profilePhoto: 'pending' | 'approved' | 'rejected';
}
export interface DriverEarnings {
  today: number; thisWeek: number; thisMonth: number; total: number;
  currency: string; ridesToday: number; hoursOnline: number;
  dailyBreakdown: { date: string; earnings: number; rides: number; hours: number }[];
}
export interface WithdrawalRequest {
  id: string; amount: number; currency: string; status: 'pending' | 'processed' | 'failed';
  method: string; createdAt: string; processedAt?: string;
}
