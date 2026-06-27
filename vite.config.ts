import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['sb-7mozeajfv0v7.vercel.run', 'localhost', '127.0.0.1'],
  },
})
