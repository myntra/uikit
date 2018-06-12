import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tokens from '@myntra/tokens'

import Markdown from '../Markdown'
import PropTypeDocumenter from './PropTypeDocumenter'

const states = {
  DEPRECATED: '💔',
  EXPERIMENTAL: '️❤️',
  REVIEWING: '💛',
  READY: '💚'
}

/**
 Creates an interactive component renderer.

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <ComponentDocumenter name="Example" description="An example component." status="REVIEWING" since="0.0.0" props={[]} />
 */
export default class ComponentDocumenter extends Component {
  static propTypes = {
    /** Component name */
    name: PropTypes.string.isRequired,
    /** Component description */
    description: PropTypes.string.isRequired,
    /** Source code */
    source: PropTypes.string,
    /** Available since */
    since: PropTypes.string.isRequired,
    /** Status of component */
    status: PropTypes.oneOf(['DEPRECATED', 'EXPERIMENTAL', 'REVIEWING', 'READY']).isRequired,
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
    const styleTd = { padding: tokens.size.small, borderBottom: 'solid 1px rgba(0, 0, 0, .2)', minWidth: '200px' }
    return (
      <div id={this.props.name}>
        <h2>
          {this.props.name}
          <small style={tokens.typography.text.caption} title={this.props.status}>
            {' '}
            {states[this.props.status]} since v{this.props.since}
            {' | '}
            <a href={this.props.source} target="_blank" rel="noopener noreferrer">
              see source
            </a>
          </small>
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
                {this.props.props.filter(prop => !prop.private).map(prop => (
                  <tr key={prop.name}>
                    <td style={styleTd}>{prop.name}</td>
                    <td style={styleTd}>{prop.description ? <Markdown>{prop.description}</Markdown> : null}</td>
                    <td style={styleTd}>
                      <PropTypeDocumenter {...prop.type} meta={prop.meta} />
                    </td>
                    <td style={styleTd}>
                      {prop.defaultValue ? (
                        <code style={{ background: 'lightgray', padding: '4px', lineHeight: 2 }}>
                          {prop.defaultValue.value}
                        </code>
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
