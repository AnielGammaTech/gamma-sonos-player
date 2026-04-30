import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'gamma-sonos-player.js',
    },
    sourcemap: true,
    rollupOptions: {
      external: [],
    },
  },
});
