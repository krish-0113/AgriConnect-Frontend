import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ['sb-7mozeajfv0v7.vercel.run', 'localhost', '127.0.0.1'],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
          'pages-auth': ['./src/pages/LoginPage.tsx', './src/pages/RegisterPage.tsx', './src/pages/ForgotPasswordPage.tsx'],
          'pages-dashboard': ['./src/pages/WorkerDashboard.tsx', './src/pages/CompanyDashboard.tsx', './src/pages/AdminDashboard.tsx'],
          'pages-jobs': ['./src/pages/JobListingPage.tsx', './src/pages/JobDetailPage.tsx'],
          'pages-workers': ['./src/pages/WorkerListingPage.tsx', './src/pages/WorkerDetailPage.tsx'],
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
