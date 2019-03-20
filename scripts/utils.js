const fs = require('fs')
const path = require('path')

const packagesDir = path.resolve(__dirname, '../packages')
const componentsDir = path.resolve(__dirname, '../components')
const themesDir = path.resolve(__dirname, '../themes')

/**
 * Find directories names
 * @param {string} dir - target directory
 */
function findPackages(dir) {
  return fs.readdirSync(dir).filter(filename => fs.statSync(path.resolve(dir, filename)).isDirectory() && filename !== '@myntra')
}

const packages = findPackages(packagesDir)
const components = findPackages(componentsDir)
const themes = findPackages(themesDir)
const targets = [
  ...packages.map(package => `@myntra/${package}`),
  ...components.map(component => `@myntra/uikit-component-${component}`),
  ...themes.map(theme => `@myntra/uikit-theme-${theme}`)
]

/**
 * Convert to camelCase
 * @param {string} name
 */
function camelCase(name) {
  return name.replace(/[^a-zA-Z0-9]([a-z])/g, (_, char) => char.toUpperCase())
}

/**
 * Convert to PascalCase
 * @param {string} name
 */
function pascalCase(name) {
  name = camelCase(name)

  return name[0].toUpperCase() + name.substr(1)
}

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
 * @param {string} name - full component name
 */
function isTheme(name) {
  return /@myntra\/uikit-theme-/.test(getFullName(name))
}

/**
 * @param {string} name
 */
function getFullName(name) {
  name = getShortName(name)
  if (packages.includes(name)) return `@myntra/${name}`
  if (components.includes(name)) return `@myntra/uikit-component-${name}`
  if (themes.includes(name)) return `@myntra/uikit-theme-${name}`

  throw new Error(`Unknown package '${name}'`)
}

/**
 * @param {string} name
 */
function getShortName(name) {
  return name.replace(/^@myntra\/(uikit-component-|uikit-theme-)?/, '')
}

/**
 * @param {string} name
 */
function getPackageDir(name) {
  const packageName = getFullName(name)
  const dir = getShortName(name)

  return path.resolve(isComponent(packageName) ? componentsDir : isTheme(packageName) ? themesDir : packagesDir, dir)
}

/**
 * @param {string} name
 */
function getPackageRepository(name) {
  const packageName = getFullName(name)
  const dir = getShortName(name)

  return `https://bitbucket.org/myntra/uikit/src/master/${isComponent(packageName) ? 'components' : isTheme(packageName) ? 'themes' : 'packages'}/${dir}`
}

module.exports = {
  componentsDir,
  packagesDir,
  themesDir,
  components,
  packages,
  themes,
  targets,
  fuzzyMatchTarget,
  isComponent,
  isTheme,
  getFullName,
  getShortName,
  getPackageDir,
  getPackageRepository,
  camelCase,
  pascalCase
}
