import { useQuery } from '@tanstack/react-query';
import { Coordinates } from '../../../shared/types/location';
import { FareEstimate } from '../../../shared/types/ride';
import { rideApi } from '../services/rideApi';

export function useFareEstimate(
  pickup: Coordinates | null,
  destination: Coordinates | null,
  rideType?: string,
) {
  return useQuery<FareEstimate[]>({
    queryKey: ['estimate', pickup, destination, rideType],
    queryFn: () => rideApi.getFareEstimate(pickup!, destination!, rideType),
    enabled: !!pickup && !!destination,
    staleTime: 30 * 1000,
  });
}
