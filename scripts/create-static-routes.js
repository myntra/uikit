const nav = require('../docs/_app/nav')
const { execSync } = require('child_process')
const { resolve, join } = require('path')

const dist = resolve(__dirname, '../dist')

nav.forEach(({ to }) => {
  if (!to || to === '/') return

  to = to.substr(1)

  const target = join(dist, to)
  execSync(`mkdir -p ${target}`)
  execSync(`cp ${dist}/index.html ${target}/index.html`)
})
