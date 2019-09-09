/* eslint-disable node/no-extraneous-require */

// Configuration file for dev server for running one component at a time.
const Inquirer = require('inquirer')
const webpack = require('webpack')
const WebpackHTMLPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const WebpackChain = require('webpack-chain')
const WebpackDevServer = require('webpack-dev-server')
const { components, getPackageDir, componentsDir, packagesDir, kebabCase } = require('../../scripts/utils')
const Path = require('path')
const Fs = require('fs')

const component = process.argv[2]

start(component).catch(console.error)

async function start(component) {
  if (!component || !components.includes(component)) {
    const result = await Inquirer.prompt({
      name: 'component',
      type: 'list',
      message: 'Select a component:',
      choices: components
    })

    component = result.component
  }

  console.log('Starting dev server for ' + component)

  createComponentsFile(component)
  startWebpackDevServer(component)
}

function createComponentsFile(component) {
  const fileName = Path.resolve(getPackageDir(component), 'readme.mdx')
  const source = Fs.readFileSync(fileName, { encoding: 'utf8' })
  const RE = /<([A-Z](?:[a-zA-Z0-9]+))/gm

  let match

  const components = new Set()

  while ((match = RE.exec(source))) {
    const [, component] = match

    if (!/^(Documenter)$/.test(component)) components.add(component)
  }

  Fs.writeFileSync(
    Path.resolve(__dirname, 'app/uikit.js'),
    Array.from(components)
      .map(name => `export { default as ${name} } from '@myntra/uikit-component-${kebabCase(name)}'`)
      .join('\n')
  )
}

function startWebpackDevServer(component) {
  const chain = new WebpackChain()

  chain.entry('app').add(Path.resolve(__dirname, './app/dev-server-entry-file.tsx'))
  chain.output.path(Path.resolve(__dirname, '../../dist'))

  chain.mode('development')

  chain.resolve.alias
    .set('@code', Path.resolve(__dirname, './app/code.tsx'))
    .set(
      'accoutrement$',
      Path.resolve(__dirname, '../../packages/accoutrement/node_modules/accoutrement/sass/index.scss')
    )
    .set('@accoutrement', Path.resolve(__dirname, '../../packages/accoutrement/src/index.scss'))
    .set('@design', Path.resolve(__dirname, '../../themes/nuclei/design.scss'))
    .set('@documenter', Path.resolve(__dirname, './app/documenter.tsx'))
    .set('@component', Path.resolve(getPackageDir(component), 'readme.mdx'))
    .set('@mdx-js/tag$', require.resolve('@mdx-js/tag'))

  chain.resolve.alias.set(`'@myntra/uikit-component-input-text/style.scss`, componentsDir + '/input-text/style.scss')
  components.forEach(name =>
    chain.resolve.alias.set(`@myntra/uikit-component-${name}$`, componentsDir + '/' + name + '/src/index.ts')
  )
  ;['uikit-utils', 'uikit-context', 'uikit-can-i-use'].forEach(name =>
    chain.resolve.alias.set(`@myntra/${name}$`, packagesDir + '/' + name + '/src/index.ts')
  )
  // packages.forEach(chain => config.resolve.alias.set(`@myntra/${name}`, packagesDir + '/' + name + entry))

  chain.devServer
    .contentBase(false)
    .hot(true)
    .open(true)

  chain.resolve.extensions
    .add('.ts')
    .add('.tsx')
    .add('.js')
    .add('.jsx')
    .add('.mdx')

  chain.module
    .rule('sprite')
    .test(/\.sprite\.svg$/)
    .use('svg-sprite-loader')
    .loader(require.resolve('./svg-sprite-loader'))

  chain.module
    .rule('img')
    .test(/\.png$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))

  chain.module
    .rule('scss')
    .test(/\.scss/)
    .use('classnames-loader')
    .loader(require.resolve('../../packages/classnames-loader'))
    .end()
    .use('style-loader')
    .loader(require.resolve('style-loader'))
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({
      importLoaders: 2,
      modules: {
        localIdentName: '[name]_[local]_[hash:base64:5]',
        getLocalIdent(context, _, name) {
          const filename = context.resourcePath
          const component = filename
            .replace(componentsDir + '/', '')
            .split('/')
            .shift()

          return `u-${component}-${name}`
        }
      }
    })
    .end()
    .use('postcss-loader')
    .loader(require.resolve('postcss-loader'))
    .end()
    .use('sass-loader')
    .loader(require.resolve('sass-loader'))
    .options({
      implementation: require('sass')
    })
    .end()

  chain.module
    .rule('css')
    .test(/\.css/)
    .use('style-loader')
    .loader(require.resolve('style-loader'))
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({
      importLoaders: 1
    })
    .end()
    .use('postcss-loader')
    .loader(require.resolve('postcss-loader'))
    .end()

  chain.module
    .rule('babel')
    .test(/\.jsx?$/)
    .exclude.add(/node_modules/)
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true
            }
          }
        ],
        '@babel/preset-react'
      ],
      plugins: ['@babel/plugin-proposal-class-properties']
    })

  chain.module
    .rule('mdx')
    .test(/\.mdx$/)
    .exclude.add(/node_modules/)
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true
            }
          }
        ],
        '@babel/preset-react'
      ]
      // plugins: ['@babel/plugin-proposal-object-rest-spread']
    })
    .end()
    .use('post-mdx-loader')
    .loader(require.resolve('./post-mdx-helper-loader'))
    .end()
    .use('mdx-loader')
    .loader(require.resolve('@mdx-js/loader'))
    .options({
      mdPlugins: require('./markdown-plugins')
    })
    .end()
    .use('mdx-polyfill-loader')
    .loader(require.resolve('./polyfill-mdx-loader'))

  chain.module
    .rule('ts')
    .test(/\.tsx?$/)
    .use('ts-loader')
    .loader(require.resolve('ts-loader'))
    .options({ transpileOnly: true })
    .end()

  chain.plugin('html').use(WebpackHTMLPlugin, [
    {
      template: Path.resolve(__dirname, '../public/index.html')
    }
  ])

  chain.plugin('define').use(DefinePlugin, [{ __DEV__: 'process.env.NODE_ENV !== "production"' }])

  const compiler = webpack(chain.toConfig())
  const server = new WebpackDevServer(compiler)

  server.listen(8082, '0.0.0.0')
}
