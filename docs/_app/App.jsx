import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import tokens from '@myntra/tokens'

import * as elements from '@myntra/uikit-elements'
import * as compounds from '@myntra/uikit-compounds'
import * as patterns from '@myntra/uikit-patterns'
import * as internals from '@myntra/uikit-internals'

import Page from './Page'

import 'whatwg-fetch'

import './app.css'

export default function App() {
  return (
    <BrowserRouter>
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
          <Link to="/">Getting Started</Link>
          <Link to="/contributing">Contribution Guidelines</Link>
          <Link to="/changelog">Changelog</Link>
          <div className="sidebar-sep" />
          <Link to="/tokens">Tokens</Link>
          <div className="sidebar-sep" />
          <Link to="/component-elements">Elements</Link>
          <ul>
            {Object.keys(elements).map(name => (
              <li key={name}>
                <a href={'/component-elements#' + name}>{name}</a>
              </li>
            ))}
          </ul>
          <Link to="/component-compounds">Compounds</Link>
          <ul>
            {Object.keys(compounds).map(name => (
              <li key={name}>
                <a href={'/component-compounds#' + name}>{name}</a>
              </li>
            ))}
          </ul>
          <Link to="/component-patterns">Patterns</Link>
          <ul>
            {Object.keys(patterns).map(name => (
              <li key={name}>
                <a href={'/component-patterns#' + name}>{name}</a>
              </li>
            ))}
          </ul>
          <Link to="/component-internals">Internals</Link>
          <ul>
            {Object.keys(internals).map(name => (
              <li key={name}>
                <a href={'/component-internals#' + name}>{name}</a>
              </li>
            ))}
          </ul>
        </aside>
        <footer className="footer">&copy; 2018 - {new Date().getFullYear()} Myntra UIKit</footer>
      </div>
    </BrowserRouter>
  )
}
