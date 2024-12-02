module.exports = {
  env: {
    es2022: true,
    node: true,
    'vitest-globals/env': true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:vitest-globals/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'no-fallthrough': 'off',
    'no-unused-vars': 'off',
    'prefer-const': 'warn',
  },
}
