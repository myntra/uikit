/* globals CURRENT_BRANCH */

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
          <Link to={CURRENT_BRANCH + '/'}>Getting Started</Link>
          <Link to={CURRENT_BRANCH + '/contributing'}>Contribution Guidelines</Link>
          <Link to={CURRENT_BRANCH + '/changelog'}>Changelog</Link>
          <div className="sidebar-sep" />
          <Link to={CURRENT_BRANCH + '/tokens'}>Tokens</Link>
          <div className="sidebar-sep" />
          <Link to={CURRENT_BRANCH + '/component-elements'}>Elements</Link>
          <ul>
            {Object.keys(elements).map(name => (
              <li key={name}>
                <a href={CURRENT_BRANCH + '/component-elements#' + name}>{name}</a>
              </li>
            ))}
          </ul>
          <Link to={CURRENT_BRANCH + '/component-compounds'}>Compounds</Link>
          <ul>
            {Object.keys(compounds).map(name => (
              <li key={name}>
                <a href={CURRENT_BRANCH + '/component-compounds#' + name}>{name}</a>
              </li>
            ))}
          </ul>
          <Link to={CURRENT_BRANCH + '/component-patterns'}>Patterns</Link>
          <ul>
            {Object.keys(patterns).map(name => (
              <li key={name}>
                <a href={CURRENT_BRANCH + '/component-patterns#' + name}>{name}</a>
              </li>
            ))}
          </ul>
          <Link to={CURRENT_BRANCH + '/component-internals'}>Internals</Link>
          <ul>
            {Object.keys(internals).map(name => (
              <li key={name}>
                <a href={CURRENT_BRANCH + '/component-internals#' + name}>{name}</a>
              </li>
            ))}
          </ul>
        </aside>
        <footer className="footer">&copy; 2018 - {new Date().getFullYear()} Myntra UIKit</footer>
      </div>
    </BrowserRouter>
  )
}
