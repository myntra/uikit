module.exports = {
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  setupFiles: ['./scripts/setup-enzyme.js'],
  transform: {
    '^.+\\.(js|jsx)$': './scripts/transform-babel.js',
    '^.+\\.(svg)$': './scripts/transform-svg.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es|@myntra)'],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!packages/@myntra/{uikit-internals,eslint-config-standard,tokens,docgen,tokenizer}/**',
    '!packages/@myntra/{uikit-internals,uikit-elements,uikit-compounds,uikit-patterns}/src/index.js'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: process.env.CI
    ? {
        global: {
          branches: 50,
          functions: 80,
          lines: 50,
          statements: -20
        }
      }
    : {}
}
