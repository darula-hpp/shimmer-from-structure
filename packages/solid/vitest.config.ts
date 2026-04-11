/// <reference types="vitest" />
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  test: {
    pool: 'threads',
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/__tests__/setup.ts',
    css: true,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
