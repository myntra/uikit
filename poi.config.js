const path = require('path')

module.exports = {
  define: {
    CURRENT_BRANCH: JSON.stringify(process.env.CURRENT_BRANCH ? '/' + process.env.CURRENT_BRANCH : '')
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

    const jsx = config.module.rules.find(it => it.test.toString().includes('jsx'))

    if (jsx) {
      if ('use' in jsx) {
        jsx.use.push({ loader: require.resolve('@myntra/docgen/src/loader.js') })
      } else if ('loader' in jsx) {
        jsx.use = [jsx.loader, { loader: require.resolve('@myntra/docgen/src/loader.js') }]
        delete jsx.loader
      }
    }

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
            plugins: [require('postcss-import')(), require('postcss-css-variables')()] // eslint-disable-line node/no-unpublished-require
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

    return config
  }
}
