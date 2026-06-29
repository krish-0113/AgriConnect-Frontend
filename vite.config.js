import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ['sb-7mozeajfv0v7.vercel.run', 'sb-7dpbck75vxrq.vercel.run', 'localhost', '127.0.0.1'],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  build: {
    // Enable code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          'vendor-state': ['@reduxjs/toolkit', 'react-redux'],
          // Feature chunks
          'pages-auth': ['./src/pages/LoginPage.jsx', './src/pages/RegisterPage.jsx', './src/pages/ForgotPasswordPage.jsx'],
          'pages-dashboard': ['./src/pages/WorkerDashboard.jsx', './src/pages/CompanyDashboard.jsx', './src/pages/AdminDashboard.jsx'],
          'pages-jobs': ['./src/pages/JobListingPage.jsx', './src/pages/JobDetailPage.jsx'],
          'pages-workers': ['./src/pages/WorkerListingPage.jsx', './src/pages/WorkerDetailPage.jsx'],
        },
      },
    },
    // Chunk size warnings threshold
    chunkSizeWarningLimit: 600,
    // Generate source maps for production debugging
    sourcemap: false,
    // Optimize terser options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
})
