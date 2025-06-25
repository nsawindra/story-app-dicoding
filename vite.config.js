import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/story-api.dicoding.dev\/.*/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'story-api-cache', cacheableResponse: { statuses: [0, 200] } },
          },
          {
            urlPattern: /.*\.dicoding\.dev\/images\/stories\/.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'story-images-cache', expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 } },
          },
        ],
      },
      manifest: {
        name: 'StoryVerse PWA',
        short_name: 'StoryVerse',
        description: 'Aplikasi berbagi cerita sebagai Progressive Web App.',
        theme_color: '#34495e',
        background_color: '#f0f2f5',
        start_url: '/',
        display: 'standalone',
        icons: [
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
        screenshots: [
          { src: 'screenshots/screenshot-mobile.png', sizes: '540x720', type: 'image/png', form_factor: 'narrow', label: 'Tampilan Mobile' },
          { src: 'screenshots/screenshot-desktop.png', sizes: '1280x720', type: 'image/png', form_factor: 'wide', label: 'Tampilan Desktop' },
        ],
        shortcuts: [
          { name: 'Tambah Cerita Baru', url: '/#/add-story', icons: [{ src: 'icons/icon-192x192.png', sizes: '192x192' }] },
        ],
      },
    }),
  ],
});