import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Page, Button, NavBar, BreadCrumb, TopBar, ErrorBoundary } from '@myntra/uikit'
import { META } from '../../uikit'
import { withRootState, AppLink } from '@spectrum'
import { pathToAction } from 'redux-first-router' // TODO: Add this to spectrum. '@spectrum/router:push'
import Home from '@myntra/uikit-pro-icons/svgs/Home'
import PencilPaintbrush from '@myntra/uikit-pro-icons/svgs/PencilPaintbrush'
import Cubes from '@myntra/uikit-pro-icons/svgs/Cubes'
import Box from '@myntra/uikit-pro-icons/svgs/Box'
import Donate from '@myntra/uikit-pro-icons/svgs/Donate'
import History from '@myntra/uikit-pro-icons/svgs/History'
import '@myntra/uikit/design.scss' // @import '../accoutrement/src/index.scss';
import './default.scss'

function DefaultLayout({ router, children, goto }) {
  return (
    <Page
      className="layout-container"
      renderNavBar={() => (
        <NavBar
          tabIndex={1}
          currentPath={router.location.pathname}
          onNavLinkClick={({ to }) => goto(to, router.location.routesMap)}
          title="UIKit | Myntra"
          className="layout-nav"
          renderLink={({ href, children, ...props }) => (
            <AppLink {...props} to={href} tabIndex={-1}>
              {children}
            </AppLink>
          )}
        >
          <NavBar.Item to="/" icon={Home}>
            Home
          </NavBar.Item>
          <NavBar.Group title="Guidelines" icon={PencilPaintbrush} to="/guide">
            <NavBar.Item to="/guide/colors">Colors</NavBar.Item>
            <NavBar.Item to="/guide/icons">Icons</NavBar.Item>
            <NavBar.Item to="/guide/typography">Typography</NavBar.Item>
            <NavBar.Item to="/guide/text-legibility">Text Legibility</NavBar.Item>
          </NavBar.Group>
          <NavBar.Group title="Components" icon={Cubes} to="/components">
            <NavBar.Item key="_" to="/components/">
              - Index -
            </NavBar.Item>
            {META.map(component => (
              <NavBar.Item key={component.name} to={component.path}>
                {component.name}
              </NavBar.Item>
            ))}
          </NavBar.Group>
          <NavBar.Group title="Spectrum" icon={Box} to="/spectrum">
            <NavBar.Item key="_" to="/spectrum/">
              Getting Started
            </NavBar.Item>
          </NavBar.Group>
          <NavBar.Item to="/contributing" icon={Donate}>
            Contributing
          </NavBar.Item>
          <NavBar.Item to="/changelog" icon={History}>
            Change Log
          </NavBar.Item>
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

          {router.location.pathname.startsWith('/components') && (
            <Button
              type="link"
              inheritTextColor
              style={{ float: 'right', marginRight: '1rem', fontSize: '0.75em' }}
              onClick={() => window.openEditor && window.openEditor()}
            >
              Open Editor
            </Button>
          )}
        </TopBar>
      )}
    >
      <main className="layout-main">
        <ErrorBoundary
          renderFallback={({ error, info }) => (
            <Alert>
              {error.message}
              <br />
              <pre>{info.componentStack}</pre>
            </Alert>
          )}
        >
          {children}
        </ErrorBoundary>
      </main>
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
