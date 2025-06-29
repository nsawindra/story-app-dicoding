import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        
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
        
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
        screenshots: [
          
        ],
        shortcuts: [
          
        ],
      },
    }),
  ],
});