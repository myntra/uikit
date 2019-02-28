const { componentsDir, packagesDir, packages, components } = require('../scripts/utils')
const path = require('path')

module.exports = {
  lintOnSave: false,
  /** @param {import('webpack-chain')} config */
  chainWebpack(config) {
    /* eslint-disable prettier/prettier */
    config.resolve.alias.set('@uikit', componentsDir)
    packages.forEach(name => config.resolve.alias.set(`@myntra/${name}`, packagesDir + '/' + name))
    components.forEach(name => config.resolve.alias.set(`@myntra/uikit-component-${name}`, componentsDir + '/' + name))
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
    /* eslint-enable prettier/prettier */
  }
}
