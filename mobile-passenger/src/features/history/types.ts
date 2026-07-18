export interface RideHistoryItem {
  id: string;
  pickupAddress: string;
  destinationAddress: string;
  date: string;
  fare: number;
  currency: string;
  status: string;
  driverName: string;
  rating?: number;
}

export interface RideHistoryState {
  items: RideHistoryItem[];
  page: number;
  hasMore: boolean;
  loading: boolean;
}
