const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.lint.json",
    ecmaVersion: "latest", // Allows the use of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'airbnb-base'
  ],
  plugins: ['prettier', '@typescript-eslint/eslint-plugin','import'],
  env: {
    node: true, // Enable Node.js global variables
  },
  rules: {
    'prettier/prettier': [1, prettierOptions],
    'no-console': 'warn',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};