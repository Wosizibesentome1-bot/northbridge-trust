import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset paths work on both Vercel and GitHub Pages project URLs.
export default defineConfig({
  base: './',
  plugins: [react()],
});
