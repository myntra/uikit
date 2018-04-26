module.exports = {
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  setupFiles: ['./scripts/setup-enzyme.js'],
  transform: {
    '^.+\\.(js|jsx)$': './scripts/transform-babel.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es|@myntra)'],
  collectCoverageFrom: ['packages/**/*.{js,jsx}', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  }
}
