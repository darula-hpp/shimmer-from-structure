import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    solid(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['src/__tests__'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ShimmerSolid',
      formats: ['es', 'cjs'],
      fileName: (format: string) => `index.${format === 'es' ? 'esm.js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['solid-js', 'solid-js/web', '@shimmer-from-structure/core'],
      output: {
        globals: {
          'solid-js': 'SolidJS',
          'solid-js/web': 'SolidJSWeb',
          '@shimmer-from-structure/core': 'ShimmerCore',
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
