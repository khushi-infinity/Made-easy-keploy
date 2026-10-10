import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', '.next', 'out', 'scripts/**', 'eslint.config.mjs'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ...pluginJs.configs.recommended,
    languageOptions: {
      parser: tseslint.parser,
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      // Next.js App Router uses the new JSX transform — no React import needed
      'no-undef': 'off',
    },
  },
];
