import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/member/',
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
  server: {
    host: '0.0.0.0',  // Tambahkan ini untuk akses luar
    port: 8100,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600
  }
})
