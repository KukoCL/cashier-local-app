/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  root: './src',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      enabled: true,
      reportOnFailure: true,
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        'src/test-setup.ts',
        'src/__tests__/**',
        '**/*.d.ts',
        '**/main.ts',
        '**/vite-env.d.ts',
        '**/App.vue',
        '**/infraestructure/**',
        '**/types/**',
        'src/infraestructure/appMessages.ts',
        'src/infraestructure/constants.ts',
        'src/types/interfaces.ts',
        'src/types/index.ts',
        'src/main.ts',
        'src/App.vue',
      ],
    },
  },
})
