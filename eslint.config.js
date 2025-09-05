import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    ignores: [
      '**/dist/**',
      '**/bin/**',
      '**/obj/**',
      '**/wwwroot/**',
      '**/node_modules/**',
      '**/*.min.js',
      '**/*.d.ts',
    ],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  skipFormatting,
  {
    rules: {
      eqeqeq: ['error', 'always'],
      'vue/max-len': ['error', {
        'code': 120,
        'template': 300,
        'comments': 120,
      }],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-multiple-empty-lines': ['error', {
        'max': 1,
        'maxEOF': 1,
        'maxBOF': 0,
      }],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
    },
  },
);
