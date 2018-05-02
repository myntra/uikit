const { createTransformer } = require('babel-jest')
const rootBabelOptions = {
  envName: 'test',
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-dynamic-import-node',
    'babel-plugin-react-svg'
  ]
}

module.exports = createTransformer(rootBabelOptions)
module.exports.rootBabelOptions = rootBabelOptions
