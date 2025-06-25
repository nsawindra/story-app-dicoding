import StoryAPI from "../api/story-api.js";

const NotificationHelper = {
  VAPID_PUBLIC_KEY: 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk',

  async init() {
    if (!('Notification' in window) || !('PushManager' in window)) {
      console.warn('Push Notification tidak didukung di browser ini.');
      alert('Push Notification tidak didukung di browser ini.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Izin notifikasi diberikan.');
      await this._subscribe();
    }
  },

  async _subscribe() {
    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const sub = await serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this._urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY),
      });

      // Kirim subscription ke server API
      const subJson = sub.toJSON();
      await StoryAPI.subscribeNotification({
        endpoint: subJson.endpoint,
        keys: subJson.keys,
      });

      console.log('Berhasil subscribe ke push notification.');
      alert('Berhasil mengaktifkan notifikasi!');
    } catch (error) {
      console.error('Gagal subscribe ke push notification:', error);
      alert('Gagal mengaktifkan notifikasi.');
    }
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
};

export default NotificationHelper;