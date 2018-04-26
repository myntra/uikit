const DocGenPlugin = require('@myntra/docgen/src/plugin')

module.exports = {
  webpack(config) {
    config.module.rules.unshift({
      test: [/\.md$/],
      loader: 'file-loader',
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    })

    const css = config.module.rules.find(it => it.test.toString() === '/\\.css$/')

    css.use.forEach(it => {
      if (it.loader === 'css-loader') {
        it.options.modules = true
        it.options.localIdentName = '[local]-[hash:base64:5]'
      }
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
