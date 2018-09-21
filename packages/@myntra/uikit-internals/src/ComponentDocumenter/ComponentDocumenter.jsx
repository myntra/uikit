import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tokens from '@myntra/tokens'

import Markdown from '../Markdown'
import PropTypeDocumenter from './PropTypeDocumenter'
import { Table } from '@myntra/uikit-compounds'

const states = {
  DEPRECATED: '💔',
  EXPERIMENTAL: '️❤️',
  REVIEWING: '💛',
  READY: '💚'
}

/**
 Creates an interactive component renderer.

 @since 0.0.0
 @status REVIEWING
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

            <Table data={this.props.props.filter(prop => !prop.private)}>
              <Table.Column key="name" label="Name" />
              <Table.Column key="description" label="Description">
                {({ data }) => <Markdown>{data.description || ''}</Markdown>}
              </Table.Column>
              <Table.Column key="type" label="Type">
                {({ data }) => <PropTypeDocumenter {...data.type} meta={data.meta} reference={data.reference} />}
              </Table.Column>
              <Table.Column key="default" label="Default">
                {({ data }) =>
                  data.defaultValue ? (
                    <code style={{ background: 'lightgray', padding: '4px', lineHeight: 2 }}>
                      {data.defaultValue.value}
                    </code>
                  ) : null
                }
              </Table.Column>
            </Table>
          </div>
        )}

        {this.props.render && this.props.render()}
      </div>
    )
  }
}
