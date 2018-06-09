module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'plugin:jest/recommended'
  ],
  plugins: ['react', 'prettier', 'standard', 'json', 'babel', 'jest'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true,
    'jest/globals': true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        printWidth: 120,
        semi: false,

        /* `singleQuote: true`
         * IN PRETTIER IS SIMILAR TO THE ESLINT RULE:
         * `quotes: [error, single, { avoidEscape: true }],`
         */
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false,
        parser: 'babylon'
      }
    ]
  }
}
