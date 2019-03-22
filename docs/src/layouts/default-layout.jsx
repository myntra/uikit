import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '@uikit/nav-bar'
import { META } from '../uikit'
import { withRootState, AppLink } from '@spectrum'
import { pathToAction } from 'redux-first-router' // TODO: Add this to spectrum. '@spectrum/router:push'

import './default-layout.css'

function DefaultLayout({ router, children, goto }) {
  return (
    <section className="layout-container">
      <NavBar
        currentPath={router.location.pathname}
        onNavLinkClick={({ to }) => goto(to, router.location.routesMap)}
        title="UIKit | Myntra"
        className="layout-nav"
        renderLink={({ href, children, ...props }) => (
          <AppLink {...props} to={href}>
            {children}
          </AppLink>
        )}
      >
        <NavBar.Group title="Components" icon="code">
          {META.map(component => (
            <NavBar.Item key={component.name} to={component.path}>
              {component.name}
            </NavBar.Item>
          ))}
        </NavBar.Group>
      </NavBar>
      <main className="layout-main">{children}</main>
    </section>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.any
}

export default withRootState(state => state, { goto: (path, routes) => pathToAction(path, routes) })(DefaultLayout)
