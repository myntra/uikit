import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tokens from '@myntra/tokens'

import Markdown from './Markdown'

const states = {
  EXPERIMENTAL: '🔥',
  BETA: '🤞',
  READY: '✅'
}

/**
 Creates an interactive component renderer.

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <ComponentDocumenter name="Example" description="An example component." status="BETA" since="0.0.0" props={[]} />
 */
export default class ComponentDocumenter extends Component {
  static propTypes = {
    /** Component name */
    name: PropTypes.string.isRequired,
    /** Component description */
    description: PropTypes.string.isRequired,
    /** Available since */
    since: PropTypes.string.isRequired,
    /** Status of component */
    status: PropTypes.oneOf(['EXPERIMENTAL', 'BETA', 'READY']).isRequired,
    /** Props */
    props: PropTypes.array.isRequired,
    /** Methods */
    methods: PropTypes.array,
    /** Example Code */
    children: PropTypes.node,
    /** Additional slot to render content */
    render: PropTypes.func
  }

  state = { error: null }

  componentDidCatch(error) {
    this.setState({ error: error.message })
  }

  render() {
    if (this.state.error) return <div>ERROR: {this.state.message}</div>

    const styleTh = { padding: tokens.size.small, borderBottom: 'solid 2px rgba(0, 0, 0, .3)' }
    const styleTd = { padding: tokens.size.small, borderBottom: 'solid 1px rgba(0, 0, 0, .2)' }
    return (
      <div>
        <h2>
          {this.props.name}
          <sup title={this.props.status} style={tokens.typography.text.caption}>
            {states[this.props.status]}
          </sup>
          <small style={tokens.typography.text.caption}> (since v{this.props.since})</small>
        </h2>
        <Markdown>{this.props.description}</Markdown>
        {this.props.children}

        {this.props.props.length > 0 && (
          <div>
            <h2>Props:</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={styleTh}>Name</th>
                  <th style={styleTh}>Description</th>
                  <th style={styleTh}>Type</th>
                  <th style={styleTh}>Default</th>
                </tr>
              </thead>
              <tbody>
                {this.props.props.map(prop => (
                  <tr key={prop.name}>
                    <td style={styleTd}>{prop.name}</td>
                    <td style={styleTd}>{prop.description}</td>
                    <td style={styleTd}>{prop.type ? prop.type.name : 'Unknown'}</td>
                    <td style={styleTd}>
                      {prop.defaultValue ? (
                        <code style={{ background: 'lightgray', padding: '4px' }}>{prop.defaultValue.value}</code>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {this.props.render && this.props.render()}
      </div>
    )
  }
}
