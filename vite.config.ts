import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  root: '.',
  esbuild: {
    jsx: 'automatic',
  },
});
