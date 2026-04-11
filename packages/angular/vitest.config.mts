import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'forks',
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/__tests__/setup.ts',
    include: ['src/__tests__/**/*.test.ts'],
    css: true,
  },
});
