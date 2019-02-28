import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from '../../../packages/uikit-compounds/src/Table/Table'

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

        {docs.props.length > 0 && (
          <div>
            <h2>Props:</h2>

            <Table data={docs.props.filter(prop => !prop.private).filter(prop => !/^(_|className)/.test(prop.name))}>
              <Table.Column key="name" label="Name" />
              <Table.Column key="description" label="Description">
                {({ data }) => {
                  data.description || ''
                }}
              </Table.Column>
              <Table.Column key="type" label="Type">
                {({ data }) => (data.type && data.name !== 'children' ? data.type.name : null)}
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
      </div>
    )
  }
}
