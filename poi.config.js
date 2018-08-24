module.exports = {
  define: {
    CURRENT_BRANCH: JSON.stringify(process.env.CURRENT_BRANCH ? '/' + process.env.CURRENT_BRANCH : '')
  },
  configureWebpack(config) {
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

    config.module.rules.push({
      test: /\.sprite$/,
      loader: require.resolve('@myntra/uikit-icon-loader')
    })

    config.stats = 'verbose'

    return config
  }
}
