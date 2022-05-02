const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  ignorePatterns: ['src/abi /*.*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      modules: true,
    },
    sourceType: 'module',
    project: 'tsconfig.lint.json',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  env: {
    node: true, // Enable Node.js global variables
  },
  plugins: ['prettier', '@typescript-eslint/eslint-plugin','import'],
  rules: {
    'prettier/prettier': [1, prettierOptions],
    "@typescript-eslint/no-floating-promises": ["error"],
    "import/no-extraneous-dependencies" : "error",
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  settings: {
    'import/resolver': {
      'node': {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      // use <root>/tsconfig.json
      typescript: {},
    },
  },
};
