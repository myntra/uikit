const path = require('path')
const { exec } = require('child_process')

async function findTransformFiles() {
  const paths = [path.resolve(__dirname, '../packages/@myntra')]

  const promised = require('@znck/promised').default // eslint-disable-line
  const glob = require('glob') // eslint-disable-line

  return Array.from(
    new Set(
      (await Promise.all(
        paths.map(dir =>
          promised({
            glob
          }).glob('**/*.scss', {
            cwd: dir,
            nodir: true,
            realpath: true
          })
        )
      )).reduce((acc, item) => acc.concat(item), [])
    )
  ).filter(it => !it.endsWith('tokens.scss'))
}

let files
async function use() {
  files = await findTransformFiles()
  return files.forEach(it => {
    run(it)
  })
}

if (process.argv[2] && process.argv[2] !== '-w') {
  const file = path.resolve(__dirname, `../${process.argv[2]}`)
  run(file)
} else {
  use()
}

function run(file) {
  const fileName = path.basename(file, '.scss')
  if (process.argv[2] === '-w' || process.argv[3] === '-w') {
    console.log('\nWatching... ' + file)
    exec(
      `node-sass --no-source-map --watch ${file} ${path.dirname(file)}/${fileName}.module.css`,
      error => error && console.error(error)
    )
  } else {
    console.log('Compiling... ' + file)
    exec(
      `node-sass --no-source-map ${file} ${path.dirname(file)}/${fileName}.module.css`,
      error => error && console.error(error)
    )
    exec(`yarn lint:css --fix ${path.dirname(file)}/${fileName}.module.css`)
  }
}
