import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Tracker Meniu 14 Zile',
        short_name: 'Meniu14',
        description: 'Tracker zilnic pentru meniu pe 14 zile',
        theme_color: '#111827',
        background_color: '#f7f6f3',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    host: true, // This allows the server to be accessible on the local network
    port: 5173, // Optional: Specify the port
  },
});
