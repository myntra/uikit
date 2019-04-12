const fm = require('front-matter')

module.exports = function PostMDXHelperLoader(content) {
  const {
    body,
    attributes: { layout }
  } = fm(content)
  const Layout = layout
    ? `
export const layout = React.lazy(() => import('@layouts/${layout}'))
`
    : ''

  return `
import Documenter from '@components/documenter'
import Code from '@components/code'
${Layout}

${body}`
}
