/* eslint-disable node/no-extraneous-import  */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { InputSwitch } from '@myntra/uikit'
import { ThemeProvider as Nuclei } from '@myntra/tokens'
import { ThemeProvider as Unity } from '@myntra/tokens-unity'
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

  state = { active: '/', themes: [Nuclei, Unity], index: 0 }

  onRouteVisit = active => {
    if (this.state.active !== active) {
      setTimeout(() => this.setState({ active }), 0)
    }
  }

  render() {
    const ThemeProvider = this.state.themes[this.state.index]

    return (
      <ThemeProvider>
        <div className="app">
          <Nav expand="auto" currentPath={this.props.location.pathname}>
            <div className="theme-switcher">
              <InputSwitch value={this.state.index === 0} onChange={value => this.setState({ index: value ? 0 : 1 })} />{' '}
              Change Theme
            </div>
          </Nav>
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
