const { execSync } = require('child_process')

try {
  execSync('npm publish', { stdio: 'pipe' }, true)
  console.log('Done.')
} catch (ex) {
  const output = ex.stderr.toString()

  if (output.includes('forbidden cannot modify pre-existing version')) {
    console.log('Already Published.')
  } else {
    console.error('Unknown Error.')
  }
}
