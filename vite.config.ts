import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'https://umzrm.com.ng/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example of creating separate chunks for libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // You can add more chunks as needed
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Set limit to 1 MB
  }
});
