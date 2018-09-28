/* eslint-disable node/no-unpublished-require */
// create package.json, README, etc. for packages that don't have them yet

const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')
const baseVersion = require('../lerna.json').version
const { targets } = require('./utils')
const packagesDir = path.resolve(__dirname, '../packages/@myntra')
targets.forEach(shortName => {
  if (!fs.statSync(path.join(packagesDir, shortName)).isDirectory()) {
    return
  }

  const name = `@myntra/${shortName}`
  const pkgPath = path.join(packagesDir, shortName, `package.json`)
  if (args.force || !fs.existsSync(pkgPath)) {
    const json = {
      name,
      version: baseVersion,
      description: name,
      main: `src/index.js`,
      module: `dist/${shortName}.js`,
      author: 'Rahul Kadyan <hi@znck.me>',
      license: 'UNLICENSED',
      repository: `https://bitbucket.org/myntra/uikit/src/master/packages/@myntra/${shortName}`,
      publishConfig: {
        registry: 'http://registry.myntra.com:8000'
      },
      files: ['src/', 'dist/', 'bin/']
    }

    let existing = {}

    if (fs.existsSync(pkgPath)) {
      existing = require(pkgPath)
    }

    fs.writeFileSync(pkgPath, JSON.stringify(Object.assign({}, existing, json), null, 2))
  }

  const readmePath = path.join(packagesDir, shortName, `README.md`)
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# ${name}`)
  }

  const srcDir = path.join(packagesDir, shortName, `src`)
  const indexPath = path.join(packagesDir, shortName, `src/index.js`)
  if (!fs.existsSync(indexPath)) {
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir)
    }
    fs.writeFileSync(indexPath, ``)
  }
})
