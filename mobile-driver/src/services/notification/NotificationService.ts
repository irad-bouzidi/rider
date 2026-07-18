import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true }),
});

class NotificationService {
  private deviceToken: string | null = null;

  async initialize() {
    if (!Device.isDevice) return;
    const { status: existing } = await Notifications.getPermissionsAsync();
    const finalStatus = existing === 'granted' ? existing : (await Notifications.requestPermissionsAsync()).status;
    if (finalStatus !== 'granted') return;
    const tokenData = await Notifications.getExpoPushTokenAsync();
    this.deviceToken = tokenData.data;
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default', importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250], lightColor: '#000000',
      });
    }
  }

  getDeviceToken() { return this.deviceToken; }
  async scheduleLocalNotification(title: string, body: string, data?: any) {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data, sound: true }, trigger: null,
    });
  }
  addNotificationReceivedListener(handler: (n: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(handler);
  }
  addNotificationResponseReceivedListener(handler: (r: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(handler);
  }
  async getBadgeCount() { return Notifications.getBadgeCountAsync(); }
  async setBadgeCount(count: number) { await Notifications.setBadgeCountAsync(count); }
}

export const notificationService = new NotificationService();
