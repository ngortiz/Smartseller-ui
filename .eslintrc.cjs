module.exports = {
  env: {
    'prettier/prettier': error,
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],

  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs,jsx}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 2021, // Cambiado a un número
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {}
}
