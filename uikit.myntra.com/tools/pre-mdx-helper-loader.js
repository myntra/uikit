const fm = require('front-matter')
const utils = require('loader-utils')
const path = require('path')

module.exports = function PostMDXHelperLoader(content) {
  const {
    body,
    attributes: { layout, noEdit }
  } = fm(content)
  const { basePath } = utils.getOptions(this)
  const Layout = layout
    ? `
export const layout = React.lazy(() => import('@layouts/${layout}'))
`
    : ''

  return `
import Documenter from '@components/documenter'
import Code from '@components/code'
${Layout}

${body}${
    noEdit
      ? ''
      : `

<br />
<br />
<br />
<hr />
<a href="https://bitbucket.com/myntra/uikit/src/next/${path.relative(
          basePath,
          this.resourcePath
        )}" target="_blank">Edit Page</a>`
  }
`
}
