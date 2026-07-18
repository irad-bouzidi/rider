import { useEffect } from 'react';
import { useRideStore } from '../../../store/rideStore';
import { subscribeToRideRequests } from '../../../services/websocket/rideSubscription';
export function useRideRequests() {
  const { pendingRequests, addPendingRequest, removePendingRequest } = useRideStore();
  useEffect(() => {
    const unsub = subscribeToRideRequests((data) => {
      if (data.type === 'new_request') addPendingRequest(data.request);
      else if (data.type === 'request_expired') removePendingRequest(data.requestId);
    });
    return () => unsub();
  }, [addPendingRequest, removePendingRequest]);
  return { pendingRequests };
}
