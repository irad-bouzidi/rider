export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

export type NotificationType =
  | 'ride_accepted'
  | 'driver_arriving'
  | 'driver_arrived'
  | 'ride_completed'
  | 'ride_cancelled'
  | 'payment_receipt'
  | 'promo'
  | 'system'
  | 'support';

export interface NotificationPreferences {
  rideUpdates: boolean;
  promotions: boolean;
  paymentAlerts: boolean;
  supportMessages: boolean;
}
