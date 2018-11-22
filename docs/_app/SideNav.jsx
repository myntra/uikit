import React from 'react'
import NavBar from '@myntra/uikit-compounds/src/NavBar/NavBar'
/* eslint-disable node/no-extraneous-import */
import * as elements from '@myntra/uikit-elements'
import * as compounds from '@myntra/uikit-compounds'
import * as patterns from '@myntra/uikit-patterns'
import * as internals from '@myntra/uikit-internals'
/* eslint-enable */
import { Link } from 'react-router-dom'

const components = { elements, compounds, patterns, internals }
const ignored = new Set(['Tab'])

export default class Nav extends React.PureComponent {
  render() {
    return (
      <NavBar
        title="Myntra UIKit"
        linkComponent={({ href, children }) => <Link to={href}>{children}</Link>}
        {...this.props}
      >
        <NavBar.Item title="Getting Started" href="/" />
        <NavBar.Item title="Conventions" href="/conventions/" />
        <NavBar.Item title="Contribution Guidelines" href="/contributing/" />
        <NavBar.Item title="Changelog" href="/changelog/" />
        <NavBar.Group title="Overview">
          <NavBar.Item title="Components" href="/components/" />
          <NavBar.Item title="Tokens" href="/tokens/" />
        </NavBar.Group>
        {Object.keys(components).map(menu => {
          return (
            <NavBar.Item key={`component-${menu}`} title={`${menu.charAt(0).toUpperCase()}${menu.slice(1)}`}>
              {Object.keys(components[menu])
                .filter(name => !ignored.has(name))
                .map(item => (
                  <NavBar.Item key={`component-${menu}/${item}`} title={item} href={`/component-${menu}/${item}`} />
                ))}
            </NavBar.Item>
          )
        })}
        {this.props.children}
      </NavBar>
    )
  }
}
