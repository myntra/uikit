const chalk = require('chalk')
const jsdoc = require('jsdoc-api')
const { findTransforms } = require('./migrate/find-transforms')

async function docs(files) {
  return (await jsdoc.explain({ files }))
    .filter(it => it.kind === 'function' && it.scope === 'global' && it.description)
    .reduce((acc, fn) => {
      acc[fn.name] = fn.description

      return acc
    }, Object.create(null))
}

module.exports = async function codemods() {
  const transforms = await findTransforms()

  if (Object.keys(transforms).length === 0) {
    console.log(chalk.red('No codemods found'))

    return
  }

  console.log('List of available transforms:\n')

  for (const name in transforms) {
    console.log(chalk.yellow(name))

    const meta = await docs(transforms[name].__filename)
    for (const transform in transforms[name]) {
      if (transform.startsWith('__')) continue

      console.log('  - ' + transform + ' (key: ' + chalk.green(name + '.' + transform) + ')')

      if (transform in meta) {
        console.log('\n      ' + chalk.gray(meta[transform].replace(/\r?\n/g, '\n      ')) + '\n')
      }
    }
  }
}
