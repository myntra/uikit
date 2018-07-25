// Required to load code modes.
require('babel-register')({
  babelrc: false,
  ignore(filename) {
    return !/(codemod-utils\/src|\.codemod\.js)/.test(filename)
  },
  presets: [require('babel-preset-es2015'), require('babel-preset-stage-1')]
})

const promised = require('@znck/promised').default
const glob = require('glob')
const path = require('path')

async function findTransformFiles() {
  const paths = [
    path.resolve(__dirname, '../../node_modules/@myntra'),
    path.resolve(__dirname, '../../../node_modules/@myntra'),
    path.resolve(__dirname, '../../../../node_modules/@myntra'),
    path.resolve(__dirname, '../../@myntra'),
    path.resolve(__dirname, '../../../@myntra'),
    path.resolve(__dirname, '../../../../@myntra'),
    path.resolve(process.cwd(), 'node_modules/@myntra'),
    path.resolve(process.cwd(), '../node_modules/@myntra'),
    path.resolve(process.cwd(), '../../node_modules/@myntra'),
    path.resolve(process.cwd(), '../../../node_modules/@myntra')
  ]

  return Array.from(
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
  ).filter(it => !/\/tests?\//i.test(it))
}

async function findTransforms(params) {
  const files = await findTransformFiles()

  return files.reduce((acc, file) => {
    const name = path.basename(file).replace('.codemod.js', '')
    acc[name] = {
      ...acc[name],
      ...require(file),
      __filename: file
    }

    return acc
  }, Object.create(null))
}

module.exports = {
  findTransforms,
  findTransformFiles
}
