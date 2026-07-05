import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // F9: glob quebrado deve FALHAR, não passar em silêncio (invariante TDD).
    coverage: {
      provider: 'v8',
      include: ['src/lib/**', 'scripts/**'],
      reporter: ['text', 'lcov'],
    },
  },
});
