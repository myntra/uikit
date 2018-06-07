const promised = require('@znck/promised').default
const Runner = require('jscodeshift/src/Runner')
const glob = require('glob')
const fs = require('fs')
const path = require('path')

async function findTransforms() {
  const paths = [
    path.resolve(__dirname, '../node_modules/@myntra'),
    path.resolve(__dirname, '../../node_modules/@myntra'),
    path.resolve(__dirname, '../../@myntra'),
    path.resolve(__dirname, '../../../@myntra'),
    path.resolve(__dirname, '../../../node_modules/@myntra'),
    path.resolve(__dirname, process.cwd(), 'node_modules/@myntra')
  ]

  const transforms = Array.from(
    new Set(
      (await Promise.all(
        paths.map(dir =>
          promised({
            glob
          }).glob('**/*.codemod.js', {
            cwd: dir,
            nodir: true,
            realpath: true
          })
        )
      )).reduce((acc, item) => acc.concat(item), [])
    )
  )

  return transforms
}

module.exports = async function migrate(target, { recursive, dryRun, only }) {
  const isFile = (await promised(fs).stat(target)).isFile()
  const dir = isFile ? path.dirname(target) : target
  const files = isFile
    ? [target]
    : (await promised({
        glob
      }).glob(recursive ? '**/*.@(js|jsx)' : '*.@(js|jsx)', {
        cwd: dir,
        nodir: true,
        ignore: ['node_modules']
      })).map(file => path.resolve(dir, file))
  const transforms = await findTransforms(only)

  const isDebug = process.env.UIKIT_CLI_MODE === 'debug'

  if (isDebug) {
    console.log('Transforms:\n  - ' + transforms.join('\n  - ') + '\n')
    console.log('Files:\n  - ' + files.join('\n  - ') + '\n')
  }

  await Runner.run(require.resolve('./migrate/transform.js'), files, {
    only: new Set(
      Array.isArray(only)
        ? only.length
          ? only
          : ['*']
        : typeof only === 'string'
          ? only.split(',').map(part => part.trim())
          : ['*']
    ),
    transforms,
    extensions: 'js,jsx',
    dry: !!dryRun,
    runInBand: !!dryRun || isDebug,
    print: isDebug,
    verbose: isDebug ? 5 : 0
  })
}
