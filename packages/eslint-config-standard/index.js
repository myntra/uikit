module.exports = {
  extends: ['standard', 'plugin:react/recommended', 'prettier', 'prettier/react', 'prettier/standard'],
  plugins: ['react', 'prettier', 'standard', 'json'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: true,
        printWidth: 120,
        semi: false,

        /* `singleQuote: true`
         * IN PRETTIER IS SIMILAR TO THE ESLINT RULE:
         * `quotes: [error, single, { avoidEscape: true }],`
         */
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
  },
}
