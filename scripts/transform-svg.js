const { rootBabelOptions } = require('./transform-babel')
const fs = require('fs')
const babel = require('babel-core')
const crypto = require('crypto')

const THIS_FILE = fs.readFileSync(__filename)

module.exports = {
  getCacheKey(fileData, filename, configString) {
    return crypto
      .createHash('md5')
      .update(THIS_FILE)
      .update('\0', 'utf8')
      .update(fileData)
      .update('\0', 'utf8')
      .update(filename)
      .update('\0', 'utf8')
      .update(configString)
      .digest('hex')
  },
  process(source, filename) {
    const code = babel.transform(
      `
import React from 'react'

export default function(props) {
  return (${source.replace('<svg', '<svg {...props}')})
}`,
      rootBabelOptions
    ).code

    return code
  }
}
