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
const url = require('rollup-plugin-url')
const del = require('rollup-plugin-delete')
const size = require('rollup-plugin-bundle-size')
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
if (isComponent(name) || !isTheme(name)) {
  const config = {
    input: get('src/index.ts'),
    external(name) {
      return (
        (pkg.dependencies && name in pkg.dependencies) ||
        (pkg.peerDependencies && name in pkg.peerDependencies)
      )
    },
    plugins: [
      del(get('dist/**/*')),
      aliases(),
      sprite(),
      url({ exclude: ['**/*.sprite.svg'], include: ['**/*.png'] }),
      nodeResolve(),
      css(),
      size(),
      classnames(),
      ts({
        tsconfig: 'tsconfig.build.json',
        tsconfigOverride: {
          include: [get('src'), path.resolve(__dirname, '@types')],
          compilerOptions: {
            declaration: true,
            rootDir: get('src'),
            baseUrl: get('src'),
          },
        },
      }),
    ],
  }

  if (pkg.module)
    configs.push({
      ...config,
      output: {
        file: get(pkg.module),
        format: 'esm',
      },
    })

  if (pkg.main)
    configs.push({
      ...config,
      output: {
        file: get(pkg.main),
        format: 'cjs',
        exports: 'named',
      },
    })
} else if (isTheme(name)) {
  console.log('Building theme: ', name)
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

function sprite() {
  return {
    name: 'sprite.svg',
    transform(source, id) {
      if (!/\.sprite\.svg$/i.test(id)) return

      return {
        code: `const content = ${JSON.stringify(
          source
        )}; \nconst el = document.createElement('div'); el.setAttribute('hidden', ''); el.setAttribute('style', 'display: none'); el.innerHTML = content; document.body.appendChild(el); export default null;`,
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
