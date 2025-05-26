import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules', 'dist', 'build', 'babel.config.js', 'metro.config.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        console: 'readonly',
        __DEV__: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        process: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      react,
      'react-native': reactNative,
      import: importPlugin,
    },
    rules: {
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        ignoreRestSiblings: true 
      }],
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react-native/no-inline-styles': 'warn',
    },
  },
  prettier,
];
