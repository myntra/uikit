/* eslint-disable node/no-extraneous-import  */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import tokens from '@myntra/tokens'

import { ThemeProvider } from '@myntra/uikit'
import Nav from './SideNav'

import Page from './Page'

import 'whatwg-fetch'

import './app.css'

export default class App extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }

  state = { active: '/' }

  onRouteVisit = active => {
    if (this.state.active !== active) {
      setTimeout(() => this.setState({ active }), 0)
    }
  }

  render() {
    return (
      <ThemeProvider>
        <div className="app" style={{ fontFamily: tokens.font.face.default }}>
          <Nav expand="auto" currentPath={this.props.location.pathname} />
          <main className="main">
            <Switch>
              <Route exact path="/" component={Page} />
              <Route path="/:page/:name?" component={Page} />
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    )
  }
}
