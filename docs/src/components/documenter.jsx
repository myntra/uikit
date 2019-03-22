import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from './markdown'

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

    return (
      <div id={docs.name}>
        {hideName ? null : <h1>{docs.name}</h1>}

        <p title={docs.status}>
          <span title={docs.status}>{states[docs.status]}</span>
          <span>since v{docs.since}</span> · <a href={'https://bitbucket.com/myntra/uikit/' + docs.file} target="_blank" rel="noopener noreferrer">
            see source code
          </a>
        </p>

        <Markdown>{docs.description}</Markdown>

        {children}

        {this.props.sub ? <h4>API</h4> : <h2>API</h2>}
        <div className="documenter--props">
          {
            docs.props.filter(prop => !prop.private).map(prop => (
              <div id={`${docs.name}-${prop.name}`} className="documenter--prop" key={prop.name}>
                <div className="documenter--prop-header">
                  <div className="documenter--prop-name">{prop.name}</div>
                  <div className="documenter--prop-type" title={prop.type ? prop.type.name : 'any'}>{prop.type ? prop.type.name : 'any'}</div>
                  <div className="documenter--prop-value">
                    {prop.required ? <span className="documenter--prop-required">required</span> : 'defaultValue' in prop ? JSON.stringify(prop.defaultValue, null, 2) : 'undefined' }
                  </div>
                </div>
                <div className="documenter--prop-description">
                  {prop.since && <p>Available in v{prop.since}+</p>}
                  {prop.deprecated && <Markdown>{`_This prop has been **deprecated**._ ` + prop.deprecated}</Markdown>}
                  <Markdown>{prop.description}</Markdown>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
