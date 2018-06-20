const nav = require('../docs/_app/nav')
const { execSync } = require('child_process')
const { resolve, join } = require('path')
const { readFileSync } = require('fs')

function getExports(filename) {
  const content = readFileSync(resolve(__dirname, '../packages/@myntra', filename)).toString()
  const names = {}

  content.replace(/export \{ default as ([^\s]+) \} from '[^']+'/g, (_, name) => {
    names[name] = true
  })

  return names
}

const dist = resolve(__dirname, '../dist')
const components = {
  compounds: getExports('uikit-compounds/src/index.js'),
  elements: getExports('uikit-elements/src/index.js'),
  internals: getExports('uikit-internals/src/index.js'),
  patterns: getExports('uikit-patterns/src/index.js')
}

function createSymlinks(items) {
  items.forEach(({ to, children }) => {
    if (!to || to === '/') return

    to = to.substr(1)

    const target = join(dist, to)
    execSync(`mkdir -p ${target}`)
    execSync(`cp ${dist}/index.html ${target}/index.html`)

    children && createSymlinks(children(components))
  })
}

createSymlinks(nav)
