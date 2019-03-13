import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    hideName: PropTypes.bool
  }

  render() {
    const { component, hideName = true, children } = this.props
    const docs = component.__docs

    if (!docs) return <div>No docs found</div>

    return (
      <div id={docs.name}>
        {hideName ? null : <h1>{docs.name}</h1>}

        <p title={docs.status}>
          {states[docs.status]} <small>{docs.status}</small> ·{' '}
          <a href={'https://bitbucket.com/myntra/uikit/' + docs.file} target="_blank" rel="noopener noreferrer">
            since v{docs.since}
          </a>
        </p>

        {docs.description}

        {children}
      </div>
    )
  }
}
