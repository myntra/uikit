/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import PropTypes from 'prop-types'
import { Promised } from '@myntra/uikit-elements'
import * as internals from '@myntra/uikit-internals'
import tokens from '@myntra/tokens'

const { Markdown } = internals
const MarkdownCache = {}

function fetchMarkdown(path) {
  if (path in MarkdownCache) {
    console.log('From cache: ' + path)

    return MarkdownCache[path]
  }

  MarkdownCache[path] = fetch(path).then(response => response.text())

  return MarkdownCache[path]
}

export default function Page({ match }) {
  const page = match.params.page || 'introduction'
  const name = match.params.name

  return (
    <div className="page">
      <Promised
        fn={() => import(`../${page}.md`).then(result => fetchMarkdown(result.default))}
        renderError={error => <pre>{error.message}</pre>}
        render={content => <Markdown context={{ tokens, ...internals }}>{content}</Markdown>}
      />
      <Promised
        fn={() => import(`../${page}.js`)}
        render={component => <component.default only={name ? [name] : []} />}
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
