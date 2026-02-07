import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: vitePreprocess(),
      emitCss: false,
      compilerOptions: {
        css: 'injected',
      },
    }),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/test/**/*', '**/*.test.ts'],
    }),
  ],
  resolve: {
    // Ensure we use the browser bundle for testing
    conditions: ['browser'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ShimmerSvelte',
      formats: ['es', 'umd'],
      fileName: (format: string) => `index.${format === 'es' ? 'esm.js' : 'js'}`,
    },
    rollupOptions: {
      external: [/^svelte(\/|$)/, '@shimmer-from-structure/core'],
      output: {
        globals: {
          svelte: 'Svelte',
          'svelte/internal/client': 'SvelteInternalClient',
          '@shimmer-from-structure/core': 'ShimmerCore',
        },
      },
    },
  },
  // @ts-expect-error vitest types are not automatically included in vite config type
  test: {
    pool: 'threads',
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
