import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
    plugins: [
        angular({
            tsconfig: './tsconfig.app.json',
        }),
    ],
    server: {
        port: 4200,
    },
});
