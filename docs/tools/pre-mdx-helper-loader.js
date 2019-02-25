const fm = require('front-matter')
const { getOptions } = require('loader-utils')

module.exports = function PostMDXHelperLoader(content) {
  const { body, attributes } = fm(content)

  return `
import Layout from '@layouts/${attributes.layout || 'default-layout'}'
import Documenter from '@components/documenter'

${content}`
}
