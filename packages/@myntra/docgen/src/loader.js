const docgen = require('./index.js')

const EXPORT = /export\s+default\s+(?:class\s+|function\s*|)([A-Za-z0-9]+)/

module.exports = async function DocGenLoader(source) {
  const callback = this.async()
  const { resourcePath } = this

  if (resourcePath.endsWith('jsx')) {
    try {
      const meta = docgen(resourcePath, source)
      const jsdoc = `\nconst __jsdoc__ = ${JSON.stringify(meta)}`.replace(
        /"--\{computed\}-->(.*)<--\{computed\}--"/g,
        (_, code) => code
      )

      const matches = EXPORT.exec(source)

      if (matches) source = source + jsdoc + `\n${matches[1]}.__docs = __jsdoc__\n`
    } catch (error) {
      this.emitError(new Error(resourcePath + ' in ' + error.message))
    }
  }

  callback(null, source)
}
