/* eslint-disable node/no-unpublished-require */
// create package.json, README, etc. for packages that don't have them yet

const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')

const { version } = require('../package.json')
const { targets, getPackageDir, getPackageRepository, getShortName, isComponent } = require('./utils')

targets.forEach(name => {
  const shortName = getShortName(name)
  const rootDir = getPackageDir(name)

  const pkgFile = path.join(rootDir, `package.json`)
  const pkg = {
    name,
    version,
    main: isComponent(name) ? `src/${shortName}.tsx` : `src/index.ts`,
    module: `dist/${shortName}.js`,
    author: 'Rahul Kadyan <hi@znck.me>',
    license: 'UNLICENSED',
    repository: getPackageRepository(name),
    publishConfig: {
      registry: 'http://registry.myntra.com:8000'
    },
    files: ['src/', 'dist/', 'bin/', '*.codemod.js']
  }
  if (fs.existsSync(pkgFile)) {
    Object.assign(pkg, require(pkgFile))
  }

  fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2))

  const readmeFile = path.join(rootDir, `README.md`)
  if (!fs.existsSync(readmeFile)) {
    fs.writeFileSync(readmeFile, `# ${name}`)
  }

  const mainFile = path.join(rootDir, pkg.main)
  const srcDir = path.dirname(mainFile)
  if (!fs.existsSync(mainFile)) {
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir)
    }
    fs.writeFileSync(mainFile, ``)
  }
})
