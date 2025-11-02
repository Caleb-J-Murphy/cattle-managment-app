import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // jsdom environment for React/frontend
    include: ['src/web/**/*.{test.ts,test.tsx}'], // frontend tests
    exclude: ['node_modules/', 'dist/'],
    setupFiles: './vitest.setup.mjs', // setup mocks for window, scroll, etc.

    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/web/**/*.{ts,tsx}'],
      exclude: ['node_modules/', 'dist/', '**/*.test.ts', '**/*.test.tsx', '**/*.d.ts'],
      reportsDirectory: './coverage',
    },
  },
});
