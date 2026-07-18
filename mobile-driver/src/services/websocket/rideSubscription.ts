import { socketClient } from './socketClient';
export function subscribeToRideRequests(handler: (data: any) => void) {
  return socketClient.subscribe('/topic/driver/ride-requests', handler);
}
export function subscribeToRideUpdates(rideId: string, handler: (data: any) => void) {
  return socketClient.subscribe(`/topic/ride/${rideId}`, handler);
}
export function subscribeToPassengerLocation(rideId: string, handler: (data: any) => void) {
  return socketClient.subscribe(`/topic/ride/${rideId}/passenger-location`, handler);
}
export function sendDriverLocation(latitude: number, longitude: number) {
  socketClient.send('/app/driver/location', { latitude, longitude, timestamp: new Date().toISOString() });
}
export function acceptRide(rideId: string) { socketClient.send(`/app/ride/${rideId}/accept`, {}); }
export function rejectRide(rideId: string) { socketClient.send(`/app/ride/${rideId}/reject`, {}); }
export function startRide(rideId: string) { socketClient.send(`/app/ride/${rideId}/start`, {}); }
export function completeRide(rideId: string) { socketClient.send(`/app/ride/${rideId}/complete`, {}); }
