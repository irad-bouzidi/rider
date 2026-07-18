export interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  role: 'passenger' | 'driver';
  photoUrl?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photoUrl?: string;
  defaultPaymentMethodId?: string;
  emergencyContact?: EmergencyContact;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  shareRideStatus: boolean;
  showETA: boolean;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface UserSettings {
  preferences: UserPreferences;
  privacy: PrivacySettings;
}

export interface PrivacySettings {
  shareLocation: boolean;
  shareRideHistory: boolean;
  allowMarketing: boolean;
}
