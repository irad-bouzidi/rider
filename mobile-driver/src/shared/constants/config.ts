export const config = {
  appName: 'Ride Sharing Driver',
  appVersion: '1.0.0',
  staleTime: 5 * 60 * 1000,
  cacheTime: 30 * 60 * 1000,
  retryCount: 2,
  map: { defaultLatitude: 40.7128, defaultLongitude: -74.006, defaultLatitudeDelta: 0.0922, defaultLongitudeDelta: 0.0421, searchDebounceMs: 300 },
  location: { highAccuracyInterval: 3000, backgroundInterval: 10000, significantChange: 50 },
  websocket: { reconnectDelay: 5000, heartbeatInterval: 10000, maxReconnectAttempts: 10 },
  offline: { maxQueueSize: 50, maxRetries: 5, baseRetryDelay: 1000 },
  driver: { rideRequestTimeout: 15, maxPassengerPickupRadius: 2000 },
  pagination: { defaultPageSize: 20 },
};
