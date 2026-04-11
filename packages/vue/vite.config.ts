import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/__tests__'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ShimmerVue',
      formats: ['es', 'cjs'],
      fileName: (format: string) => `index.${format === 'es' ? 'esm.js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue', '@shimmer-from-structure/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@shimmer-from-structure/core': 'ShimmerCore',
        },
      },
    },
  },
  test: {
    pool: 'forks',
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
