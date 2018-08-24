/* globals CURRENT_BRANCH */
/* eslint-disable node/no-extraneous-import  */
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import tokens from '@myntra/tokens'

import { ThemeProvider } from '@myntra/uikit'
import Nav from './SideNav'

import Page from './Page'

import 'whatwg-fetch'

import './app.css'

export default class App extends Component {
  state = { active: '/' }

  onRouteVisit = active => {
    if (this.state.active !== active) {
      setTimeout(() => this.setState({ active }), 0)
    }
  }

  render() {
    return (
      <ThemeProvider>
        <BrowserRouter basename={CURRENT_BRANCH}>
          <div className="app" style={{ fontFamily: tokens.font.face.default }}>
            <Nav />
            <main className="main">
              <Switch>
                <Route exact path="/" component={Page} />
                <Route path="/:page/:name?" component={Page} />
              </Switch>
            </main>
            <footer className="footer">
              <small>
                &copy; 2018 - {new Date().getUTCFullYear()} Myntra UIKit (React v{React.version})
              </small>
            </footer>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}
