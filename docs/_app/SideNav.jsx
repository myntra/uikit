import React from 'react'
import NavBar from '@myntra/uikit-compounds/src/NavBar/NavBar'
/* eslint-disable node/no-extraneous-import */
import * as elements from '@myntra/uikit-elements'
import * as compounds from '@myntra/uikit-compounds'
import * as patterns from '@myntra/uikit-patterns'
import * as internals from '@myntra/uikit-internals'
/* eslint-enable */
import { NavLink } from 'react-router-dom'

const components = { elements, compounds, patterns, internals }

export default class Nav extends React.PureComponent {
  state = { expand: 'open' }

  render() {
    return (
      <NavBar
        title="Myntra UIKit"
        currentPath={window.location.pathname}
        expand={this.state.expand}
        linkComponent={({ href, children }) => <NavLink to={href}>{children}</NavLink>}
        onClick={({ expand }) => this.setState({ expand })}
      >
        <NavBar.Item title="Getting Started" href="/" />
        <NavBar.Item title="Contribution Guidelines" href="/contributing/" />
        <NavBar.Item title="Changelog" href="/changelog/" />
        <NavBar.Group>
          <NavBar.Item title="Tokens" href="/tokens/" />
        </NavBar.Group>
        {Object.keys(components).map(menu => {
          return (
            <NavBar.Item key={`component-${menu}`} title={`${menu.charAt(0).toUpperCase()}${menu.slice(1)}`}>
              {Object.keys(components[menu]).map(item => (
                <NavBar.Item key={`component-${menu}/${item}`} title={item} href={`/component-${menu}/${item}`} />
              ))}
            </NavBar.Item>
          )
        })}
      </NavBar>
    )
  }
}
