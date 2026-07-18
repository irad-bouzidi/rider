import { socketClient } from '../../../services/websocket/socketClient';

export const rideSocket = {
  subscribeToRide(rideId: string, onUpdate: (data: any) => void) {
    return socketClient.subscribe(`/topic/ride/${rideId}`, onUpdate);
  },

  subscribeToDriverLocation(driverId: string, onLocation: (data: any) => void) {
    return socketClient.subscribe(`/topic/driver/${driverId}/location`, onLocation);
  },

  sendEvent(rideId: string, event: string, data?: any) {
    socketClient.send(`/app/ride/${rideId}/event`, { event, data });
  },

  cancelRide(rideId: string, reason?: string) {
    socketClient.send(`/app/ride/${rideId}/cancel`, { reason });
  },
};
