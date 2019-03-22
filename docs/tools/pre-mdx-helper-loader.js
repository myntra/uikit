const fm = require('front-matter')
const { getOptions } = require('loader-utils')

module.exports = function PostMDXHelperLoader(content) {
  const { body, attributes } = fm(content)

  return `
import Documenter from '@components/documenter'
import Code from '@components/code'

export const layout = '${attributes.layout || 'default-layout'}'

${content}`
}
