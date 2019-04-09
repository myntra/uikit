import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '@uikit/nav-bar'
import TopBar from '@uikit/top-bar'
import Page from '@uikit/page'
import BreadCrumb from '@uikit/bread-crumb'
import { META } from '../uikit'
import { withRootState, AppLink } from '@spectrum'
import { pathToAction } from 'redux-first-router' // TODO: Add this to spectrum. '@spectrum/router:push'

import './default-layout.css'

function DefaultLayout({ router, children, goto }) {
  return (
    <Page
      className="layout-container"
      renderNavBar={() => (
        <NavBar
          tabIndex={1}
          currentPath={router.location.pathname}
          onNavLinkClick={({ to }) => goto(to, router.location.routesMap)}
          isActivePath={(item, currentPath) => item && item.startsWith(currentPath)}
          title="UIKit | Myntra"
          className="layout-nav"
          renderLink={({ href, children, ...props }) => (
            <AppLink {...props} to={href} tabIndex={-1}>
              {children}
            </AppLink>
          )}
        >
          <NavBar.Group title="Components" icon="cubes">
            <NavBar.Item key="_" to="/components">
              - Index -
            </NavBar.Item>
            {META.map(component => (
              <NavBar.Item key={component.name} to={`${PATH_PREFIX}${component.path}`}>
                {component.name}
              </NavBar.Item>
            ))}
          </NavBar.Group>
        </NavBar>
      )}
      renderTopBar={() => (
        <TopBar className="layout-top" title="Documentation" user={{ name: 'Anonymous' }}>
          <BreadCrumb>
            {
              router.location.pathname
                .replace(/\/$/, '')
                .split('/')
                .reduce(
                  (acc, link) => {
                    const to = acc.link + '/' + link

                    if (link === '') {
                      acc.items.push(
                        <BreadCrumb.Item key={to}>
                          <AppLink to={to}>Home</AppLink>
                        </BreadCrumb.Item>
                      )
                    } else {
                      acc.items.push(
                        <BreadCrumb.Item key={to}>
                          <AppLink to={to}>{toPascalCase(link)}</AppLink>
                        </BreadCrumb.Item>
                      )
                    }

                    return acc
                  },
                  { items: [], link: '' }
                ).items
            }
          </BreadCrumb>
        </TopBar>
      )}
    >
      <main className="layout-main">{children}</main>
    </Page>
  )
}

DefaultLayout.propTypes = {
  router: PropTypes.any,
  goto: PropTypes.func,
  children: PropTypes.any
}

export default withRootState(state => state, { goto: (path, routes) => pathToAction(path, routes) })(DefaultLayout)

function toPascalCase(str) {
  str = str.replace(/-([a-z])?/g, (_, ch) => (ch || '').toUpperCase())

  return str[0].toUpperCase() + str.substr(1)
}
