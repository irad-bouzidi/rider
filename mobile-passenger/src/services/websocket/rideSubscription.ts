import { socketClient } from './socketClient';

type RideUpdateHandler = (data: any) => void;
type DriverLocationHandler = (data: { latitude: number; longitude: number }) => void;

export function subscribeToRideUpdates(
  rideId: string,
  handler: RideUpdateHandler,
): () => void {
  return socketClient.subscribe(`/topic/ride/${rideId}`, handler);
}

export function subscribeToDriverLocation(
  driverId: string,
  handler: DriverLocationHandler,
): () => void {
  return socketClient.subscribe(`/topic/driver/${driverId}/location`, handler);
}

export function sendRideEvent(rideId: string, event: string, data?: any) {
  socketClient.send(`/app/ride/${rideId}/event`, {
    event,
    data,
    timestamp: new Date().toISOString(),
  });
}
