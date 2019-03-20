const aliases = {
  '\\.css$': '<rootDir>/test/unit/style.js',
  '\\.scss$': '<rootDir>/test/unit/style.js',
  '\\.sprite\\.svg$': '<rootDir>/test/unit/svg.js',
  '@myntra/uikit-utils': '<rootDir>/packages/uikit-utils'
}

module.exports = {
  moduleNameMapper: aliases,
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup-jest.js'],
  setupFiles: ['<rootDir>/test/unit/setup-enzyme.js', '<rootDir>/test/unit/setup-window.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/old-packages/'],
  transformIgnorePatterns: ['node_modules/(?!(lodash-es))/'],
  collectCoverageFrom: ['components/**/*.{ts,tsx}'],
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
    : {},
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.test.json',
      packageJson: '<rootDir>/package.json'
    }
  }
}
