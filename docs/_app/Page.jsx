import React from 'react'
import PropTypes from 'prop-types'
import { Promised } from '@myntra/uikit-elements'
import * as internals from '@myntra/uikit-internals'
import tokens from '@myntra/tokens'

const { Markdown } = internals

export default function Page({ match }) {
  const page = match.params.page || 'introduction'

  return (
    <div className="page">
      <Promised
        fn={() =>
          import(`../${page}.md`)
            .then(result => fetch(result.default))
            .then(response => response.text())
        }
        renderError={error => <pre>{error.message}</pre>}
        render={content => <Markdown context={{ tokens, ...internals }}>{content}</Markdown>}
      />
      <Promised
        fn={() => import(`../${page}.js`)}
        render={component => <component.default />}
        renderError={() => null}
      />
    </div>
  )
}

Page.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}
