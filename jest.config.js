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
    '!packages/@myntra/{uikit-internals,eslint-config-standard,tokens}/**'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: process.env.CI
    ? {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: -10
        }
      }
    : {}
}
