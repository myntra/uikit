const { componentsDir, packagesDir, packages, components, themes, themesDir } = require('../scripts/utils')
const path = require('path')
const { version } = require('react')

const VERSION = parseFloat(version)

module.exports = {
  lintOnSave: false,
  define: {
    __DEV__: process.env.NODE_ENV !== 'production',
    CAN_USE_HOOKS: VERSION > 16.7,
    CAN_USE_CONTEXT: VERSION > 16.2,
    CAN_USE_PORTAL: VERSION >= 16,
    CAN_USE_FRAGMENT: VERSION >= 16,
    CAN_USE_SUSPENSE: VERSION > 16.5,
  },
  /** @param {import('webpack-chain')} config */
  chainWebpack(config) {
    /* eslint-disable prettier/prettier */
    config.resolve.alias.set('@uikit', componentsDir)
    components.forEach(name => config.resolve.alias.set(`@myntra/uikit-component-${name}`, componentsDir + '/' + name))
    packages.forEach(name => config.resolve.alias.set(`@myntra/${name}`, packagesDir + '/' + name))
    themes.forEach(name => config.resolve.alias.set(`@myntra/uikit-theme-${name}`, themesDir + '/' + name))
    config.resolve.extensions.add('.ts').add('.tsx').add('.mdx')

    config.module.rule('mdx')
      .test(/\.mdx$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('post-mdx-loader')
      .loader(require.resolve('./tools/post-mdx-helper-loader'))
      .end()
      .use('mdx-loader')
      .loader('@mdx-js/loader')
      .end()
      .use('pre-mdx-loader')
      .loader(require.resolve('./tools/pre-mdx-helper-loader'))
      .end()

    config.module.rule('js')
      .use('docgen-loader')
      .before('babel-loader')
      .loader(require.resolve('../packages/docgen/loader'))
      .options({ root: path.dirname(__dirname), test: { test: any => any.startsWith(componentsDir) } })


    config.module.rule('ts')
      .use('ts-loader')
      .options({ transpileOnly: true })
      .end()
      .use('docgen-loader')
      .after('ts-loader')
      .loader(require.resolve('../packages/docgen/loader'))
      .options({ root: path.dirname(__dirname), test: { test: any => any.startsWith(componentsDir) } })

    config.module.rule('scss').oneOf('modules').use('classnames-loader').before('style-loader').loader(require.resolve('../packages/classnames-loader'))
    config.module.rule('css').oneOf('modules').use('classnames-loader').before('style-loader').loader(require.resolve('../packages/classnames-loader'))

    config.module.rule('svg').exclude.add(/\.sprite\.svg$/).end()

    config.module.rule('sprite').test(/\.sprite\.svg$/).use('svg-sprite-loader').loader(require.resolve('./tools/svg-sprite-loader'))

    config.plugin('monaco-editor').use(require('monaco-editor-webpack-plugin'))

    config.module.rule('scss').oneOf('modules').use('sass-loader').loader(require.resolve('sass-loader')).options({
      data: (context) => {
        if (/@myntra\/uikit-theme-/.test(context.resourcePath)) return ''

        return ''
        // return `@import '@myntra/uikit-theme-nuclei/style.scss';`
      }
    })
    /* eslint-enable prettier/prettier */
  }
}
