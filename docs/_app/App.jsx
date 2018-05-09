/* globals CURRENT_BRANCH */

import React, { Component } from 'react'
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom'
import tokens from '@myntra/tokens'

import * as elements from '@myntra/uikit-elements'
import * as compounds from '@myntra/uikit-compounds'
import * as patterns from '@myntra/uikit-patterns'
import * as internals from '@myntra/uikit-internals'

import nav from './nav'

import Page from './Page'

import 'whatwg-fetch'

import './app.css'

const components = { elements, compounds, patterns, internals }

export default class App extends Component {
  state = { active: '/' }

  onRouteVisit = active => {
    if (this.state.active !== active) {
      setTimeout(() => this.setState({ active }), 0)
    }
  }

  render() {
    return (
      <BrowserRouter basename={CURRENT_BRANCH}>
        <div className="app" style={{ fontFamily: tokens.font.face.default }}>
          <header className="header">
            <h1>Myntra UIKit</h1>
          </header>
          <main className="main">
            <Switch>
              <Route exact path="/" component={Page} />
              <Route path="/:page" component={Page} />
            </Switch>
          </main>
          <aside className="sidebar">
            {nav.map(({ to, label, children }, index) => (
              <React.Fragment key={index}>
                {to ? (
                  <NavLink to={{ pathname: to }} isActive={(_, route) => this.onRouteVisit(route.pathname)} strict>
                    {label}
                  </NavLink>
                ) : (
                  <div className="sidebar-sep" />
                )}
                {children &&
                  to === this.state.active && (
                    <ul>
                      {children(components).map(({ to, label }, index) => (
                        <li key={index}>
                          <Link to={{ ...to, pathname: to.pathname }}>{label} </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </React.Fragment>
            ))}
          </aside>
          <footer className="footer">&copy; 2018 - {new Date().getFullYear()} Myntra UIKit</footer>
        </div>
      </BrowserRouter>
    )
  }
}
