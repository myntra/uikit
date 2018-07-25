const promised = require('@znck/promised').default
const Runner = require('jscodeshift/src/Runner')
const glob = require('globby')
const fs = require('fs')
const path = require('path')
const git = require('./utils/git')
const chalk = require('chalk')

const { findTransformFiles } = require('./migrate/find-transforms')

module.exports = async function migrate(target, { recursive, apply, only, commit }) {
  const isFile = (await promised(fs).stat(target)).isFile()
  const dir = isFile ? path.dirname(target) : target
  const files = isFile
    ? [path.resolve(target)]
    : await glob([recursive ? '**/*.@(js|jsx)' : '*.@(js|jsx)'], {
        cwd: dir,
        gitignore: true,
        onlyFiles: true,
        unique: true,
        absolute: true,
        ignore: ['**/node_modules']
      })
  const transforms = await findTransformFiles(only)
  const isDebug = process.env.UIKIT_CLI_MODE === 'debug'

  if (isDebug) {
    console.log('Files:\n  - ' + files.join('\n  - ') + '\n')
  }

  if (only && only.length) {
    console.log('Transforms: ' + chalk.yellow(only))
  }

  const repository = git(dir)

  if (apply && (await repository.isDirty())) {
    console.log(
      chalk.red('Commit all your changes.') + '\nCannot run ' + chalk.green('uikit migrate') + ' if git tree is dirty.'
    )
    process.exit(1)
  }

  const { error, ok } = await Runner.run(
    require.resolve('./migrate/transform.js'),
    files.filter(it => !/node_modules\//.test(it)),
    {
      only: Array.isArray(only)
        ? only.length
          ? only
          : ['*']
        : typeof only === 'string'
          ? only.split(',').map(part => part.trim())
          : ['*'],
      transforms,
      extensions: 'js,jsx',
      dry: !apply,
      runInBand: !apply || isDebug,
      print: isDebug,
      verbose: isDebug ? 5 : 0
    }
  )

  if (apply) {
    if (error === 0 && ok > 0) {
      if (commit) {
        await repository.commit(`chore: Automated code migration using 'uikit migrate'`, files)
      }
    }
  }
}
