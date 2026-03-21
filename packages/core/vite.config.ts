/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/__tests__'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ShimmerCore',
      formats: ['es', 'cjs'],
      fileName: (format: string) => `index.${format === 'es' ? 'esm.js' : 'cjs'}`,
    },
  },
  test: {
    pool: 'threads',
    globals: true,
    environment: 'jsdom',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
