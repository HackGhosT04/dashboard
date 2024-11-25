import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dashboard/', // Change 'dashboard' to the actual repository name if needed
  plugins: [
    react({
      jsxInject: 'import React from "react";', // Optional if you don't want explicit React imports in JSX
    }),
  ],
  build: {
    outDir: 'dist', // Specify the output directory for production build
    sourcemap: false, // Set to false for production to reduce bundle size (optional)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias '@' to 'src' folder for cleaner imports
    },
  },
  server: {
    port: 4000, // Default development server port
    strictPort: true, // Ensure the port doesn't change
  },
});
