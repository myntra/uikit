const fs = require('fs')
const path = require('path')

const packagesDir = path.resolve(__dirname, '../packages')
const componentsDir = path.resolve(__dirname, '../components')

/**
 * Find directories names
 * @param {string} dir - target directory
 */
function findPackages(dir) {
  return fs.readdirSync(dir).filter(filename => fs.statSync(path.resolve(dir, filename)).isDirectory())
}

const packages = findPackages(packagesDir)
const components = findPackages(componentsDir)
const targets = [...packages.map(package => `@myntra/${package}`), ...components.map(component => `@myntra/uikit-component-${component}`)]

/**
 * Find package names
 *
 * @param {string} query - fuzzy search query
 */
function fuzzyMatchTarget(query) {
  const matched = targets.filter(target => target.match(targets))

  if (matched.length) {
    return matched
  } else {
    throw new Error(`Target ${query} not found!`)
  }
}

/**
 * @param {string} name - full component name
 */
function isComponent(name) {
  return /@myntra\/uikit-component-/.test(getFullName(name))
}

/**
 * @param {string} name
 */
function getFullName(name) {
  name = getShortName(name)
  if (packages.includes(name)) return `@myntra/${name}`
  if (components.includes(name)) return `@myntra/uikit-component-${name}`

  throw new Error(`Unknown package '${name}'`)
}

/**
 * @param {string} name
 */
function getShortName(name) {
  return name.replace(/^@myntra\/(uikit-component-)?/, '')
}

/**
 * @param {string} name
 */
function getPackageDir(name) {
  const packageName = getFullName(name)
  const dir = getShortName(name)

  return path.resolve(isComponent(packageName) ? componentsDir : packagesDir, dir)
}

/**
 * @param {string} name
 */
function getPackageRepository(name) {
  const packageName = getFullName(name)
  const dir = getShortName(name)

  return `https://bitbucket.org/myntra/uikit/src/master/${isComponent(packageName) ? 'components' : 'packages'}/${dir}`
}

module.exports = {
  componentsDir,
  packagesDir,
  components,
  packages,
  targets,
  fuzzyMatchTarget,
  isComponent,
  getFullName,
  getShortName,
  getPackageDir,
  getPackageRepository,
}
