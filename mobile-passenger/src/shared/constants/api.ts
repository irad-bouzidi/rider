const DEV_API_URL = 'http://localhost:8080/api/v1';
const PROD_API_URL = 'https://api.ridesharing.com/api/v1';

export const API_BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

export const API_TIMEOUT = 15000;

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    sendOtp: '/auth/otp/send',
    verifyOtp: '/auth/otp/verify',
  },
  user: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    favoriteLocations: '/users/favorites',
    settings: '/users/settings',
  },
  rides: {
    estimate: '/rides/estimate',
    request: '/rides/request',
    cancel: (id: string) => `/rides/${id}/cancel`,
    current: '/rides/current',
    history: '/rides/history',
    detail: (id: string) => `/rides/${id}`,
    rate: (id: string) => `/rides/${id}/rate`,
  },
  payment: {
    methods: '/payments/methods',
    addCard: '/payments/cards',
    wallet: '/payments/wallet',
    walletTransactions: '/payments/wallet/transactions',
    promo: '/payments/promos/validate',
  },
  locations: {
    search: '/locations/search',
    reverse: '/locations/reverse',
    autocomplete: '/locations/autocomplete',
  },
  support: {
    tickets: '/support/tickets',
    messages: (id: string) => `/support/tickets/${id}/messages`,
  },
} as const;
