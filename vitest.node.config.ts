import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/server/**/*.test.ts'],
    exclude: ['node_modules/', 'dist/'],
    setupFiles: './vitest.setup.mjs',

    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/server/**/*.ts'],
      exclude: ['node_modules/', 'dist/', '**/*.test.ts', '**/*.d.ts'],
      reportsDirectory: './coverage',
    },
  },
});
