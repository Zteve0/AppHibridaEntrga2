import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' + assetsInlineLimit alto: todo queda incrustado en el bundle final (funciona sin internet y sin servidor)
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000
  }
});
