import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['satori', 'satori-html'],
  },
});
