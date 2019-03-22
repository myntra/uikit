const { isComponent, isTheme, getPackageDir, getFullName, getShortName, componentsDir } = require('./scripts/utils')
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
const shortName = getShortName(name)
const dir = getPackageDir(process.env.TARGET)
const pkg = require(`${dir}/package.json`)

function get(file) {
  return path.resolve(dir, file)
}

const configs = (module.exports = [])

// compile component with given theme.
if (isComponent(name)) {
  configs.push({
    input: get(pkg.main),
    output: {
      file: get(pkg.module),
      format: 'esm'
    },
    external(name) {
      return name in pkg.dependencies
    },
    plugins: [
      nodeResolve(),
      ts(),
      postcss({
        use: [
          [
            'sass',
            {
              importer: [
                (imported, importer, done) => {
                  if (imported === '@myntra/uikit-design') {
                    return {
                      file: require.resolve('./packages/uikit-design')
                    }
                  }

                  done()
                }
              ]
            }
          ]
        ],
        minimize: true,
        plugins: [postcssImport()],
        modules: {
          generateScopedName(name, filename, css) {
            const component = filename
              .replace(componentsDir + '/', '')
              .split('/')
              .shift()

            return `_u${hash(`${component}:${name}`, { algorithm: 'md5' }).substr(0, 5)}`
          }
        }
      }),
      classnames()
    ]
  })
}
