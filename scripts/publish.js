const { resolve } = require('path')
const { execSync } = require('child_process')
const { version } = require(resolve(process.cwd(), 'package.json'))

try {
  const isAlpha = /alpha/.test(version)
  const isBeta = /beta/.test(version)
  const tag = isAlpha ? 'alpha' : isBeta ? 'beta' : 'latest'
  execSync(`npm publish --tag ${tag}`, { stdio: 'pipe' }, true)
  console.log('Done.')
} catch (ex) {
  const output = ex.stderr.toString()

  if (output.includes('forbidden cannot modify pre-existing version')) {
    console.log('Already Published.')
  } else {
    console.error('Unknown Error.')
  }
}
