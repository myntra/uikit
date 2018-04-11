#!/usr/bin/env node

const path = require('path')
const runner = require('../src/runner')
if (process.argv.length < 4) {
  console.log('docgen <target> <patterns ...>')
  process.exit(0)
}

const workDir = process.cwd()
const targetDir = path.resolve(workDir, process.argv[2])
const patterns = process.argv.slice(3)

runner(workDir, targetDir, patterns)
