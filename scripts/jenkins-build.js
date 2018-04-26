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

const tasks = [
  { message: '🙌  Installing dependencies..', script: 'yarn install --pure-lockfile' },
  { message: '🤞  Running tests..', script: 'yarn test --silent --ci' },
  { message: '⚙️  Building docs...', script: 'yarn build' },
  { message: '📦  Packaging docs... (' + tar + ')', script: `tar -cf ./${tar} ./dist` },
  { message: '✅  Ready. ' }
]

tasks.forEach(task => {
  task.message && console.log(task.message)
  task.script && execSync(task.script, { stdio: ['ignore', 'pipe', 'pipe'] })
})
