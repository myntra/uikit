#! /usr/bin/env node

const path = require('path')
const generateSprite = require('./src/generate-icon-sprite')

const iconsDirs = [path.resolve(__dirname, 'src/assets/icons')]
const outputDir = path.resolve(__dirname, 'src/assets')


generateSprite(
  iconsDirs,
  path.resolve(outputDir, 'icons.sprite.svg'),
  path.resolve(outputDir, '../names.js')
).catch(console.error)
