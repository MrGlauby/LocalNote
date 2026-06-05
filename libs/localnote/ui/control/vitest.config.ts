import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    server: {
      deps: {
        inline: ['@angular/core', '@angular/common', '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/forms', '@angular/router'],
      },
    },
  },
});
