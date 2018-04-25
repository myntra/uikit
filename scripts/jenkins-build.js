const { execSync } = require('child_process')

const branch = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
const id = branch
  .toLowerCase()
  .replace(/[^a-z0-9]+/gi, '-')
  .replace(/^[-]+|[-]+|[-]+$/, '-')
const { version } = require('../package.json')
const tar = `docs~${version}~${id}.tar`

console.log('UIKit :: Version ' + version + ' (' + branch + ')')

console.log('⚙️  Building...')
execSync('yarn run build')
console.log('📦  Packaging... (' + tar + ')')
execSync(`tar -cf ./${tar} ./dist`)
console.log('✅  Ready. ')
