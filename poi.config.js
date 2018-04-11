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

    config.plugins.push(
      new DocGenPlugin([
        'packages/uikit-elements',
        'packages/uikit-internals',
        'packages/uikit-compounds',
        'packages/uikit-patterns'
      ])
    )

    return config
  }
}
