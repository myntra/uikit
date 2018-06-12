const { createTransformer } = require('babel-jest') // eslint-disable-line node/no-unpublished-require
const rootBabelOptions = {
  envName: 'test',
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-dynamic-import-node'
  ]
}

module.exports = createTransformer(rootBabelOptions)
module.exports.rootBabelOptions = rootBabelOptions
