module.exports = {
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  setupFiles: ['./scripts/setup-enzyme.js'],
  transform: {
    '^.+\\.(js|jsx)$': './scripts/transform-babel.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es|@myntra)']
}
