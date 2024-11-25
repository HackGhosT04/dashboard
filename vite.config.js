import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dashboard/',
  plugins: [
    react({
      jsxInject: 'import React from "react";', // Ensures JSX works without explicit React imports
    }),
  ],
  build: {
    outDir: 'dist', // Specify output directory for production build
    sourcemap: true, // Useful for debugging Electron apps (will generate .map files)
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Ensure the correct entry point
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias '@' to the 'src' folder for cleaner imports
    },
  },
  server: {
    port: 4000, // Default development server port
    strictPort: true, // Ensure the port does not change
  },
});
