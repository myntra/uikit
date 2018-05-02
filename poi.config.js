const path = require('path')
const DocGenPlugin = require('@myntra/docgen/src/plugin')

module.exports = {
  define: {
    CURRENT_BRANCH: JSON.stringify(process.env.BRANCH ? '/' + process.env.BRANCH : '')
  },
  webpack(config) {
    config.module.rules.unshift({
      test: [/\.md$/],
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    })

    const svg = config.module.rules.findIndex(it => it.test.toString().includes('svg'))
    if (svg > -1) {
      config.module.rules.splice(svg, 1)
    }
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-react-loader'
    })

    const css = config.module.rules.find(it => it.test.toString() === '/\\.css$/')
    css.test = id => /\.css$/.test(id) && !id.includes('packages/@myntra/') && !id.includes('nuclei')
    const styleLoader = {
      loader: 'style-loader',
      options: { sourceMap: true }
    }
    const cssLoader = {
      loader: 'css-loader',
      options: {
        autoprefixer: false,
        sourceMap: true,
        minimize: false,
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]_[local]__[hash:base64:5]'
      }
    }

    config.module.rules.push({
      test: id => id.endsWith('.css') && id.includes('nuclei'),
      use: [
        styleLoader,
        cssLoader,
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: [require('postcss-import')(), require('postcss-css-variables')()]
          }
        }
      ]
    })

    config.module.rules.push({
      test: id => id.endsWith('.css') && id.includes('packages/@myntra/'),
      use: [
        styleLoader,
        cssLoader,
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: path.resolve(__dirname, '.postcssrc')
            }
          }
        }
      ]
    })

    config.plugins.push(
      new DocGenPlugin([
        'packages/@myntra/uikit-elements',
        'packages/@myntra/uikit-internals',
        'packages/@myntra/uikit-compounds',
        'packages/@myntra/uikit-patterns'
      ])
    )

    return config
  }
}
