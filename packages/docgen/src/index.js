const react = require('react-docgen')
const doctrine = require('doctrine')
const fs = require('fs')
const path = require('path')
const deIndent = require('de-indent')

/**
 * Parse file to JSDoc Meta
 * @argument {string} filename
 * @argument {string=} source
 * @returns {JSDocMeta}
 */
module.exports = function parse(filename, source) {
  source = source || fs.readFileSync(filename)

  const meta = react.parse(source)
  const docs = doctrine.parse(meta.description)

  meta.description = docs.description

  docs.tags.forEach(tag => {
    if (tag.title === 'example') {
      meta[tag.title] = meta[tag.title] || []
      meta[tag.title].push(deIndent(tag.description))
    } else meta[tag.title] = tag.description
  })

  if (meta.methods) {
    meta.methods.forEach(method => {
      const doc = doctrine.parse(method.docblock || '')
      delete method.docblock
      method.private = doc.tags.some(tag => tag.title === 'private')
      // NTS: May require to improve generic argument type parsing.
    })
  }

  meta.props = Object.entries(meta.props).reduce((acc, [name, prop]) => acc.concat([{ name, ...prop }]), [])
  meta.sketch = 'sketch' in meta
  meta.name = meta.name || path.basename(filename).replace(/\.jsx?$/, '')

  return meta
}

/** @typedef {{value: string, computed: boolean}} PropValue */
/** @typedef {{name: string, value?: any, raw?: string}} PropType */
/** @typedef {{name: string, type: PropType, required: boolean, description: string?}} Prop */
/** @typedef {{name: string, description: string?, version: string, sketch: boolean, status: string, props: Array<Prop>}} JSDocMeta */
