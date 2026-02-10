import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward /api to Vercel in dev so checkout works locally
      '/api': {
        target: 'https://farm-to-tablevercel.vercel.app',
        changeOrigin: true,
      },
    },
  },
})

