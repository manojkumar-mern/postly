import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/posts": {
        target: "http://localhost:3500",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
