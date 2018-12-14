/* eslint-disable node/no-unpublished-require */
const fs = require('fs')
const path = require('path')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-alias')
const babel = require('rollup-plugin-babel')
const css = require('rollup-plugin-postcss')
const raw = require('rollup-plugin-string')
const classnames = require('@myntra/rollup-plugin-classnames') // eslint-disable-line node/no-extraneous-require
const bundleSize = require('rollup-plugin-bundle-size')

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const packagesDir = path.resolve(__dirname, 'packages/@myntra')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const resolve = p => './' + path.relative(__dirname, path.resolve(packageDir, p))
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}

// build aliases dynamically
const aliasOptions = { resolve: ['.jsx'] }
fs.readdirSync(packagesDir).forEach(dir => {
  if (fs.statSync(path.resolve(packagesDir, dir)).isDirectory()) {
    aliasOptions[`@myntra/${dir}`] = path.resolve(packagesDir, `${dir}/src/index`)
  }
})
const aliasPlugin = alias(aliasOptions)

const configs = {
  esm: {
    file: resolve(`dist/${name}.js`),
    format: `es`
  }
}
const replacePlugin = replace({
  'process.env.NODE_ENV': `'production'`
})
const defaultFormats = ['esm']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const packageConfigs = packageFormats.map(format => createConfig(configs[format]))

module.exports = packageConfigs

function createConfig(output, plugins = []) {
  const pkg = require(resolve(`package.json`))
  const external = [].concat(Object.keys(pkg.dependencies || {}), Object.keys(pkg.peerDependencies || {}))

  return {
    input: /tokens/.test(pkg.name) ? resolve(`tokens.jsx`) : resolve(`src/index.js`),
    external,
    plugins: [
      raw({
        // Global and Browser ESM builds inlines everything so that they can be
        include: '**/*.svg'
      }),
      css({
        include: '**/*.css',
        exclude: '**/*.module.css',
        minimize: true
      }),
      css({
        include: '**/*.module.css',
        minimize: true,
        modules: {
          generateScopedName(name, filename, css) {
            return (
              '_u_' +
              path
                .basename(filename)
                .replace(/(?:\.module)?\.css$/, '')
                .toLowerCase() +
              '_' +
              name
            )
          }
        }
      }),
      extensions({
        extensions: ['.jsx']
      }),
      babel({
        babelrc: false,
        runtimeHelpers: false,
        externalHelpers: true,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                esmodules: true
              }
            }
          ]
        ],
        plugins: [
          'babel-plugin-remove-test-ids',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-react-jsx',
          '@babel/plugin-transform-runtime',
          '@babel/plugin-external-helpers'
        ]
      }),
      aliasPlugin,
      replacePlugin,
      classnames({ include: '**/*.module.css' }),
      bundleSize(),
      ...plugins
    ],
    output: /tokens/.test(pkg.name)
      ? {
          file: resolve(`tokens.jsx`),
          format: `es`
        }
      : output,
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
}

function isFile(file) {
  try {
    return fs.statSync(file).isFile()
  } catch (err) {
    return false
  }
}

function addExtensionIfNecessary(file, extensions) {
  const name = path.basename(file)
  const files = fs.readdirSync(path.dirname(file))

  if (~files.indexOf(name) && isFile(file)) return file
  for (const ext of extensions) {
    if (~files.indexOf(`${name}${ext}`) && isFile(`${file}${ext}`)) {
      return `${file}${ext}`
    }
  }

  return null
}

function extensions({ extensions }) {
  if (!extensions || !extensions.length) {
    throw new Error(`Must specify { extensions: [..] } as non-empty array!`)
  }

  return {
    name: 'extensions',

    resolveId(importee, importer) {
      // absolute paths are left untouched
      if (path.isAbsolute(importee)) {
        return addExtensionIfNecessary(path.resolve(importee), extensions)
      }

      // if this is the entry point, resolve against cwd
      if (importer === undefined) {
        return addExtensionIfNecessary(path.resolve(process.cwd(), importee), extensions)
      }

      // external modules are skipped at this stage
      if (importee[0] !== '.') return null

      return addExtensionIfNecessary(path.resolve(path.dirname(importer), importee), extensions)
    }
  }
}
