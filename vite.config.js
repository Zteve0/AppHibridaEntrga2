import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' + assets incrustados: todo queda en el bundle final (funciona sin internet y sin servidor)
export default defineConfig({
  plugins: [react()],
  base: './',
  esbuild: { legalComments: 'none', drop: ['console', 'debugger'] },
  css: { devSourcemap: false },
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: false,
    modulePreload: { polyfill: false }
  }
});
