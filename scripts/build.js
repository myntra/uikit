/* eslint-disable node/no-unpublished-require */
/*
Produce production builds..

To specific the package to build, simply pass its name and the desired build
formats to output (defaults to `buildOptions.formats` specified in that package,
or "esm,cjs"):

```
# name supports fuzzy match. will build all packages with name containing "dom":
yarn build dom

# specify the format to output
yarn build core --formats cjs
```
*/

const fs = require('fs-extra')
const path = require('path')
const zlib = require('zlib')
const chalk = require('chalk')
const execa = require('execa')
const { targets, fuzzyMatchTarget, getPackageDir, isTheme } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const target = args._[0]
const formats = args.formats || args.f
;(async () => {
  if (!target) {
    await buildAll(targets)
    checkAllSizes(targets)
  } else {
    await buildAll(fuzzyMatchTarget(target))
    checkAllSizes(fuzzyMatchTarget(target))
  }
})()

async function buildAll(targets) {
  for (const target of targets) {
    await build(target)
  }
}

async function build(target) {
  if (isTheme(target)) return

  const pkgDir = getPackageDir(target)
  const pkg = require(`${pkgDir}/package.json`)

  if (!/\.tsx?$/.test(pkg.main)) return

  await fs.remove(`${pkgDir}/dist`)

  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      `NODE_ENV:production,` +
        `TARGET:${target}` +
        (formats ? `,FORMATS:${formats}` : ``),
    ],
    { stdio: 'inherit' }
  )
}

function checkAllSizes(targets) {
  console.log()
  for (const target of targets) {
    checkSize(target)
  }
  console.log()
}

function checkSize(target) {
  const pkgDir = path.resolve(`packages/@myntra/${target}`)
  const esmProdBuild = `${pkgDir}/dist/${target}.esm.js`
  if (fs.existsSync(esmProdBuild)) {
    const file = fs.readFileSync(esmProdBuild)
    const minSize = (file.length / 1024).toFixed(2) + 'kb'
    const gzipped = zlib.gzipSync(file)
    const gzipSize = (gzipped.length / 1024).toFixed(2) + 'kb'
    console.log(
      `${chalk.gray(
        chalk.bold(`@myntra/${target}`)
      )} min:${minSize} / gzip:${gzipSize}`
    )
  }
}
