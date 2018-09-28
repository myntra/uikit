/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import PropTypes from 'prop-types'
import { Promised } from '@myntra/uikit-elements'
import * as internals from '@myntra/uikit-internals'
import tokens from '@myntra/tokens'
import { Link } from 'react-router-dom'
import { TopBar, BreadCrumb, Grid } from '@myntra/uikit-compounds'
import * as uikit from '@myntra/uikit'
import { version } from '../../lerna.json'

const { Markdown } = internals
const MarkdownCache = {}

function fetchMarkdown(path) {
  if (path in MarkdownCache) {
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
      <TopBar
        title={
          <span>
            Myntra UIKit <small style={{ textTransform: 'initial' }}>v{version}</small>
          </span>
        }
      >
        <BreadCrumb>
          <BreadCrumb.Item>
            <Link to={`../${match.params.page || ''}`} className="breadcrumb">
              {page.replace(/[^a-z]/gi, ' ')}
            </Link>
          </BreadCrumb.Item>
          {name && (
            <BreadCrumb.Item>
              <Link to={`../${match.params.page}/${name || ''}`} className="breadcrumb">
                {name}
              </Link>
            </BreadCrumb.Item>
          )}
        </BreadCrumb>
      </TopBar>
      <Grid>
        <Grid.Column>
          <div className="content">
            <Promised
              fn={() => import(`../${page}.md`).then(result => fetchMarkdown(result.default))}
              renderError={error => <pre>{error.message}</pre>}
              render={content => <Markdown context={{ tokens, ...internals, uikit, Link }}>{content}</Markdown>}
            />
            <Promised
              fn={() => import(`../${page}.js`)}
              render={component => <component.default only={name ? [name] : []} />}
              renderError={() => null}
            />
          </div>
        </Grid.Column>
      </Grid>
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
