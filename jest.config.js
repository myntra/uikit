const aliases = {
  '\\.css$': '<rootDir>/test/unit/style.js',
  '\\.scss$': '<rootDir>/test/unit/style.js',
  '\\.svg$': 'identity-obj-proxy'
}

module.exports = {
  moduleNameMapper: aliases,
  setupTestFrameworkScriptFile: '<rootDir>/test/unit/setup-jest.js',
  setupFiles: ['<rootDir>/test/unit/setup-enzyme.js', '<rootDir>/test/unit/setup-window.js'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/scripts/transform-babel.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es|@myntra)'],
  collectCoverageFrom: [
    'packages/**/*.{js,jsx}',
    '!**/test/**',
    '!**/__codemod__/**',
    '!**/node_modules/**',
    '!packages/@myntra/uikit-elements/src/InputDate/presets.js',
    '!packages/@myntra/{uikit-internals,eslint-config-standard,stylelint-config-standard,uikit-cli,tokens,docgen,tokenizer}/**',
    '!packages/@myntra/{uikit-internals,uikit-elements,uikit-compounds,uikit-patterns,uikit}/src/index.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
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
