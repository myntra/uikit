// False positive unpublished require.
const { componentsDir, packagesDir, packages, components, themes, themesDir } = require('../scripts/utils')

const path = require('path')

/** @type {import('@myntra/spectrum-cli-shared-utils').Spectrum.Project.Options} */
module.exports = {
  name: 'uikit',
  lintOnSave: false,
  define: {
    __DEV__: true // Always include dev code docs.
  },
  deploy: {
    target: 'spectrum',
    baseUrl: '/'
  },
  /** @param {import('webpack-chain')} config */
  chainWebpack(config) {
    config.watchOptions({
      aggregateTimeout: 2000,
      ignored: ['**/*.spec.js', '__codemod__', /node_modules/]
    })

    const entry = process.env.NODE_ENV === 'production' ? '' : '/src'

    /* eslint-disable prettier/prettier */
    config.resolve.alias
      .set('@component-docs', componentsDir)
      .set('@myntra/uikit-design/design.scss$', packagesDir + '/uikit-design/design.scss')
      .set('@myntra/uikit-component-input-text/style.scss$', componentsDir + '/input-text/style.scss')
      .set('@design$', themesDir + '/nuclei/design.scss')
      .set('@theme$', themesDir + '/nuclei' + entry)

    components.forEach(name =>
      config.resolve.alias.set(`@myntra/uikit-component-${name}`, componentsDir + '/' + name + entry)
    )
    packages.forEach(name => config.resolve.alias.set(`@myntra/${name}`, packagesDir + '/' + name + entry))
    themes.forEach(name => config.resolve.alias.set(`@myntra/uikit-theme-${name}`, themesDir + '/' + name + entry))
    config.resolve.extensions
      .add('.ts')
      .add('.tsx')
      .add('.mdx')

    config.module
      .rule('mdx')
      .test(/\.mdx$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('post-mdx-loader')
      .loader(require.resolve('./tools/post-mdx-helper-loader'))
      .end()
      .use('mdx-loader')
      .loader('@mdx-js/loader')
      .options({
        mdPlugins: require('./tools/markdown-plugins')
      })
      .end()
      .use('pre-mdx-loader')
      .loader(require.resolve('./tools/pre-mdx-helper-loader'))
      .options({
        basePath: path.dirname(__dirname)
      })
      .end()

    config.module
      .rule('js')
      .use('docgen-loader')
      .after('babel-loader')
      .loader(require.resolve('../packages/docgen/loader'))
      .options({ root: path.dirname(__dirname), test: { test: any => any.startsWith(componentsDir) } })

    config.module
      .rule('ts')
      .use('ts-loader')
      .options({ transpileOnly: true })
      .end()
      .use('docgen-loader')
      .after('ts-loader')
      .loader(require.resolve('../packages/docgen/loader'))
      .options({ root: path.dirname(__dirname), test: { test: any => any.startsWith(componentsDir) } })

    if (process.env.NODE_ENV !== 'production') {
      config.module
        .rule('scss')
        .oneOf('modules')
        .use('classnames-loader')
        .before('style-loader')
        .loader(require.resolve('../packages/classnames-loader'))
    }

    config.module
      .rule('scss')
      .oneOf('modules')
      .use('css-loader')
      .tap(options => ({
        ...options,
        modules: {
          ...options.modules,
          getLocalIdent(context, _, name) {
            const filename = context.resourcePath
            const component = filename
              .replace(componentsDir + '/', '')
              .split('/')
              .shift()

            return `_u-${component}-${name}`
          }
        }
      }))

    config.module
      .rule('svg')
      .exclude.add(/\.sprite\.svg$/)
      .end()

    config.module
      .rule('sprite')
      .test(/\.sprite\.svg$/)
      .use('svg-sprite-loader')
      .loader(require.resolve('./tools/svg-sprite-loader'))

    // Added to devDependencies.
    // eslint-disable-next-line node/no-unpublished-require
    config
      .plugin('monaco-editor')
      .use(require('monaco-editor-webpack-plugin'), [{ languages: ['javascript', 'typescript'], output: 'monaco' }])
    /* eslint-enable prettier/prettier */
  }
}
