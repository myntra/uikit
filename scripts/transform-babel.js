const { createTransformer } = require('babel-jest')
const rootBabelOptions = {
  envName: 'test',
  presets: ['@babel/env', '@babel/react'],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import']
}

module.exports = createTransformer(rootBabelOptions)
