/* eslint-disable node/no-unpublished-require */
const {
  isComponent,
  isTheme,
  getPackageDir,
  getFullName,
  componentsDir,
} = require('./scripts/utils')
const path = require('path')
const ts = require('rollup-plugin-typescript2')
const postcss = require('rollup-plugin-postcss')
const nodeResolve = require('rollup-plugin-node-resolve')
const classnames = require('@myntra/rollup-plugin-classnames')
const postcssImport = require('postcss-import')
const hash = require('hasha')

if (!process.env.TARGET) {
  throw new Error(`No target found`)
}

const name = getFullName(process.env.TARGET)
const dir = getPackageDir(process.env.TARGET)
const pkg = require(`${dir}/package.json`)

function get(file) {
  return path.resolve(dir, file)
}

const configs = (module.exports = [])

// compile component with given theme.
if (isComponent(name)) {
  configs.push({
    input: get(pkg.tsMain || pkg.main),
    output: {
      file: get(pkg.module),
      format: 'esm',
    },
    external(name) {
      return (
        (pkg.dependencies && name in pkg.dependencies) ||
        (pkg.peerDependencies && name in pkg.peerDependencies)
      )
    },
    plugins: [nodeResolve(), css(), classnames(), ts()],
  })
} else if (isTheme(name)) {
  console.log('Building theme: ', name)
} else {
  configs.push({
    input: get(pkg.tsMain || pkg.main),
    output: {
      file: get(pkg.module),
      format: 'esm',
    },
    external(dependency) {
      if (/\.(png|sprite\.svg)$/.test(dependency)) {
        return true
      }

      if (name === '@myntra/uikit') {
        if (/^(react|react-dom)$/.test(dependency)) {
          return true
        }

        return false
      }

      return (
        (pkg.dependencies && dependency in pkg.dependencies) ||
        (pkg.peerDependencies && dependency in pkg.peerDependencies)
      )
    },
    plugins: [aliases(), nodeResolve(), css(), classnames(), ts()],
  })
}

function aliases() {
  return {
    name: 'aliases',
    resolveId(id, importer) {
      if (id === 'dayjs') {
        console.log({
          importer,
        })
        return require.resolve('dayjs/esm/index.js')
      }
    },
  }
}

function css() {
  return postcss({
    use: [
      [
        'sass',
        {
          importer: (url, prev, done) => {
            if (url === '@design') {
              return {
                file: path.resolve(__dirname, './themes/nuclei/design.scss'),
              }
            } else {
              return {
                file: require.resolve(url, { paths: [path.dirname(prev)] }),
              }
            }
            // done()
          },
        },
      ],
    ],
    minimize: true,
    plugins: [postcssImport()],
    modules: {
      generateScopedName(name, filename, css) {
        const component = filename
          .replace(componentsDir + '/', '')
          .split('/')
          .shift()

        return `_u${hash(`${component}:${name}`, {
          algorithm: 'md5',
        }).substr(0, 5)}`
      },
    },
  })
}
