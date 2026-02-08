import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, //! WSL Setting
    },
    host: true, //! Start host
    strictPort: true,
    port: 5173,
  },
})