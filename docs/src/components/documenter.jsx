import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from './markdown'
import Button from '@uikit/button'

import './documenter.css'

const states = {
  DEPRECATED: '💔',
  EXPERIMENTAL: '️❤️',
  REVIEWING: '💛',
  READY: '💚'
}

export default class Documenter extends Component {
  static propTypes = {
    /** Component name */
    component: PropTypes.any.isRequired,
    /** Component description */
    children: PropTypes.node,
    /** Hide name */
    hideName: PropTypes.bool,
    /** Is inner component? */
    sub: PropTypes.bool
  }

  render() {
    const { component, hideName = true, children } = this.props
    const docs = component.__docs

    if (!docs) return <div>No docs found</div>

    const anchor = (
      <a href={`#${docs.name}-API`}>
        <svg className="anchor-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
          <path
            d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            fillRule="evenodd"
          />
        </svg>
      </a>
    )

    return (
      <div id={docs.name}>
        {hideName ? null : <h1>{docs.name}</h1>}

        <p title={docs.status}>
          <small
            title={`The ${docs.name} component is in ${docs.status} state.`}
            style={{ textTransform: 'lowercase' }}
          >
            {states[docs.status]} {docs.status}
          </small>{' '}
          ·{' '}
          <small title={`The ${docs.name} component is available in UIKit v${docs.since}+.`}>since v{docs.since}</small>{' '}
          ·{' '}
          <Button
            type="link"
            inheritTextColor
            href={'https://bitbucket.com/myntra/uikit/' + docs.file}
            target="_blank"
            rel="noopener noreferrer"
            title="Go to bitbucket.com"
          >
            <span style={{ textTransform: 'initial' }}>see source code</span>
          </Button>
        </p>

        <Markdown>{docs.description}</Markdown>

        {children}

        <details>
          <summary>Component API table for developers.</summary>

          {this.props.sub ? <h4 id={`${docs.name}-API`}>{anchor}API</h4> : <h2 id={`${docs.name}-API`}>{anchor}API</h2>}
          <div className="documenter--props">
            {docs.props
              .filter(prop => !prop.private)
              .map(prop => (
                <div className="documenter--prop" key={prop.name}>
                  <a id={`${docs.name}-${prop.name}`} href="#" className="anchor" />
                  <div className="documenter--prop-header">
                    <div className="documenter--prop-name">{prop.name}</div>
                    <div className="documenter--prop-type" title={prop.type ? prop.type.name : 'any'}>
                      {prop.type ? prop.type.name : 'any'}
                    </div>
                    <div className="documenter--prop-value">
                      {prop.required ? (
                        <span className="documenter--prop-required">required</span>
                      ) : 'defaultValue' in prop ? (
                        JSON.stringify(prop.defaultValue, null, 2)
                      ) : (
                        'undefined'
                      )}
                    </div>
                  </div>
                  <div className="documenter--prop-description">
                    {prop.since && <p>Available in v{prop.since}+</p>}
                    {prop.deprecated && (
                      <Markdown>{`_This prop has been **deprecated**._ ` + prop.deprecated}</Markdown>
                    )}
                    <Markdown>{prop.description}</Markdown>
                  </div>
                </div>
              ))}
          </div>
        </details>
      </div>
    )
  }
}
