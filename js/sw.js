import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Cache semua aset dari manifest
precacheAndRoute(self.__WB_MANIFEST);

// Halaman HTML (navigasi)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'pages-cache' })
);

// CSS/JS/Worker
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({ cacheName: 'assets-cache' })
);

// Gambar
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({ cacheName: 'images-cache' })
);

// Offline fallback
self.addEventListener('fetch', (event) => {
  if (!navigator.onLine && event.request.mode === 'navigate') {
    event.respondWith(caches.match('/index.html'));
  }
});

// Push Notification
self.addEventListener('push', (event) => {
  const data = event.data?.json();
  if (data) {
    self.registration.showNotification(data.title, {
      body: data.options.body,
    });
  }
});
