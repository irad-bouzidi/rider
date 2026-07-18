import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SECURE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

const ASYNC_KEYS = {
  ONBOARDING_COMPLETE: 'onboarding_complete',
  USER_PREFERENCES: 'user_preferences',
  CACHED_HOME_DATA: 'cached_home_data',
  OFFLINE_QUEUE: 'offline_queue',
  LAST_LOCATION: 'last_location',
} as const;

export const secureStorage = {
  async getToken(key: keyof typeof SECURE_KEYS): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(SECURE_KEYS[key]);
    } catch {
      return null;
    }
  },

  async setToken(key: keyof typeof SECURE_KEYS, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(SECURE_KEYS[key], value);
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  },

  async removeToken(key: keyof typeof SECURE_KEYS): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(SECURE_KEYS[key]);
    } catch (error) {
      console.error(`Failed to delete ${key}:`, error);
    }
  },

  async clearAuth(): Promise<void> {
    await Promise.all(
      Object.values(SECURE_KEYS).map((key) => SecureStore.deleteItemAsync(key)),
    );
  },
};

export const asyncStorage = {
  async get<T>(key: keyof typeof ASYNC_KEYS): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(ASYNC_KEYS[key]);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  async set<T>(key: keyof typeof ASYNC_KEYS, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(ASYNC_KEYS[key], JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  },

  async remove(key: keyof typeof ASYNC_KEYS): Promise<void> {
    try {
      await AsyncStorage.removeItem(ASYNC_KEYS[key]);
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(ASYNC_KEYS));
    } catch (error) {
      console.error('Failed to clear async storage:', error);
    }
  },
};
