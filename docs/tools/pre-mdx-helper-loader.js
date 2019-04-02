const fm = require('front-matter')

module.exports = function PostMDXHelperLoader(content) {
  const {
    body,
    attributes: { layout, ...attributes }
  } = fm(content)
  const Layout = layout
    ? `
const InternalLayoutComponent = React.lazy(() => import('@layouts/${layout}'))
const __$layoutProps = ${JSON.stringify(attributes)}
export const layout = ({ children }) =>  <InternalLayoutComponent {...__$layoutProps}}>{children}</InternalLayoutComponent>
`
    : ''

  return `
import Documenter from '@components/documenter'
import Code from '@components/code'

${Layout}

${body}`
}
