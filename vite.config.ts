/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools';
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  root: './src',
  build: {
    outDir: '../wwwroot',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    // Fail tests if coverage thresholds are not met
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      enabled: true,
      reportOnFailure: true,
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
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
})
