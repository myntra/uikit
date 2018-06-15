const path = require('path')
const hash = require('hash-sum')
const runtime = require.resolve('./runtime')

function UIKItIconLoader(source) {
  const { resourcePath, rootContext } = this
  const context = rootContext || process.cwd()
  const id = hash(path.relative(context, resourcePath).replace(/^(\.\.[\\/])+/, ''))

  return `
    import inject from '${runtime}'

    export default function() {
      inject('${id}', ${JSON.stringify(source)})
    }
    `
}

module.exports = UIKItIconLoader
