module.exports = {
  extends: '@myntra/standard',
  overrides: [
    {
      files: ['**/*.spec.js'],
      rules: {
        'node/no-extraneous-import': [
          'error',
          {
            allowModules: ['enzyme']
          }
        ]
      }
    }
  ]
}
