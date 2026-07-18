const DEV_API_URL = 'http://localhost:8080/api/v1';
const PROD_API_URL = 'https://api.ridesharing.com/api/v1';
export const API_BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;
export const API_TIMEOUT = 15000;

export const ENDPOINTS = {
  auth: {
    login: '/auth/login', register: '/auth/register', refresh: '/auth/refresh',
    logout: '/auth/logout', sendOtp: '/auth/otp/send', verifyOtp: '/auth/otp/verify',
  },
  driver: {
    profile: '/drivers/me', status: '/drivers/me/status', location: '/drivers/me/location',
    earnings: '/drivers/me/earnings', documents: '/drivers/me/documents',
    uploadDocument: '/drivers/me/documents/upload',
  },
  vehicle: {
    myVehicle: '/drivers/me/vehicle', register: '/drivers/me/vehicle',
    types: '/vehicle-types',
  },
  rides: {
    pending: '/rides/pending', accept: '/rides/{id}/accept', reject: '/rides/{id}/reject',
    start: '/rides/{id}/start', complete: '/rides/{id}/complete', cancel: '/rides/{id}/cancel',
    current: '/rides/current', history: '/rides/history', detail: (id: string) => `/rides/${id}`,
  },
  payment: {
    wallet: '/payments/wallet', walletTransactions: '/payments/wallet/transactions',
    withdrawal: '/payments/wallet/withdrawal', methods: '/payments/methods',
  },
  locations: { search: '/locations/search', reverse: '/locations/reverse' },
} as const;
