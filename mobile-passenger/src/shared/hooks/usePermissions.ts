import { useState, useEffect, useCallback } from 'react';
import { Linking } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

type PermissionStatus = 'granted' | 'denied' | 'undetermined' | 'blocked';

interface PermissionState {
  location: PermissionStatus;
  notifications: PermissionStatus;
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<PermissionState>({
    location: 'undetermined',
    notifications: 'undetermined',
  });

  const requestLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissions((prev) => ({
      ...prev,
      location: status === 'granted' ? 'granted' : status === 'denied' ? 'blocked' : 'denied',
    }));
    return status === 'granted';
  }, []);

  const requestNotifications = useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissions((prev) => ({
      ...prev,
      notifications: status === 'granted' ? 'granted' : 'denied',
    }));
    return status === 'granted';
  }, []);

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const checkPermissions = useCallback(async () => {
    const locationStatus = await Location.getForegroundPermissionsAsync();
    setPermissions((prev) => ({
      ...prev,
      location: locationStatus.status as PermissionStatus,
    }));
  }, []);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  return {
    permissions,
    requestLocation,
    requestNotifications,
    openSettings,
  };
}
