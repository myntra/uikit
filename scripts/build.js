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
const execa = require('execa')
const { targets, fuzzyMatchTarget, getPackageDir, isTheme } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const target = args._[0]
;(async () => {
  if (!target) {
    await buildAll(targets)
  } else {
    await buildAll(fuzzyMatchTarget(target))
  }
})()

async function buildAll(targets) {
  if (process.env.CI) return Promise.all(targets.map((target) => build(target)))

  for (const target of targets) {
    await build(target)
  }
}

async function build(target) {
  // if (!isComponent(target)) return
  if (isTheme(target)) return

  const pkgDir = getPackageDir(target)
  const pkg = require(`${pkgDir}/package.json`)

  if (!/^dist\//.test(pkg.main)) return // DOES NOT NEED BUILDING

  if (!process.env.FORCE && (await fs.exists(path.resolve(pkgDir, 'dist'))))
    return // BAIL

  await fs.remove(`${pkgDir}/dist`)

  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit',
  })
}
