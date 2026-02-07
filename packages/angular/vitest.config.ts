import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'threads',
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.ts'],
    css: true,
  },
});
