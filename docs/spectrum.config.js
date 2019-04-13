// False positive unpublished require.
const { componentsDir, packagesDir, packages, components, themes, themesDir } = require('../scripts/utils')

const path = require('path')

// ¯\_(ツ)_/¯ React based Design System.
// It is defined in root directory.
// eslint-disable-next-line node/no-extraneous-require
const { version } = require('react')

const VERSION = parseFloat(version)

module.exports = {
  lintOnSave: false,
  define: {
    PATH_PREFIX: JSON.stringify(process.env.BRANCH === 'master' || !process.env.BRANCH ? '' : '/' + process.env.BRANCH),
    __DEV__: process.env.NODE_ENV !== 'production',
    CAN_USE_HOOKS: VERSION > 16.7,
    CAN_USE_CONTEXT: VERSION > 16.2,
    CAN_USE_PORTAL: VERSION >= 16,
    CAN_USE_FRAGMENT: VERSION >= 16,
    CAN_USE_SUSPENSE: VERSION > 16.5
  },
  /** @param {import('webpack-chain')} config */
  chainWebpack(config) {
    config.watchOptions({
      ignored: ['**/*.spec.js', '__codemod__']
    })

    /* eslint-disable prettier/prettier */
    config.resolve.alias
      .set('@component-docs', componentsDir)
      .set('@design', '@myntra/uikit-theme-nuclei/design.scss')
      .set('@theme', '@myntra/uikit-theme-nuclei')
    components.forEach(name => config.resolve.alias.set(`@myntra/uikit-component-${name}`, componentsDir + '/' + name))
    packages.forEach(name => config.resolve.alias.set(`@myntra/${name}`, packagesDir + '/' + name))
    themes.forEach(name => config.resolve.alias.set(`@myntra/uikit-theme-${name}`, themesDir + '/' + name))
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
        mdPlugins: [
          require('remark-slug'),
          [
            require('remark-autolink-headings'),
            {
              content: {
                type: 'element',
                tagName: 'svg',
                properties: {
                  className: ['anchor-link'],
                  viewBox: '0 0 16 16',
                  version: '1.1',
                  width: '16',
                  height: '16',
                  'aria-hidden': 'true'
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                      fillRule: 'evenodd'
                    },
                    children: []
                  }
                ]
              }
            }
          ],
          require('remark-emoji'),
          require('remark-toc'),
          require('remark-sectionize')
          // [require('remark-github'), {}],
        ]
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

    config.module
      .rule('scss')
      .oneOf('modules')
      .use('classnames-loader')
      .before(process.env.NODE_ENV === 'production' ? 'extract-css-loader' : 'style-loader')
      .loader(require.resolve('../packages/classnames-loader'))
    config.module
      .rule('css')
      .oneOf('modules')
      .use('classnames-loader')
      .before(process.env.NODE_ENV === 'production' ? 'extract-css-loader' : 'style-loader')
      .loader(require.resolve('../packages/classnames-loader'))
    config.module
      .rule('scss')
      .oneOf('modules')
      .use('css-loader')
      .tap(options => ({
        ...options,
        getLocalIdent(context, _, name) {
          const filename = context.resourcePath
          const component = filename
            .replace(componentsDir + '/', '')
            .split('/')
            .shift()

          return `_u-${component}-${name}`
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
    config.plugin('monaco-editor').use(require('monaco-editor-webpack-plugin'))
    /* eslint-enable prettier/prettier */
  }
}
