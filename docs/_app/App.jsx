import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import tokens from '@myntra/tokens'

import Page from './Page'

import 'whatwg-fetch'

import style from './app.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className={style.app} style={{ fontFamily: tokens.font.face.default }}>
        <header className={style.header}>
          <h1>Myntra UIKit</h1>
        </header>
        <main className={style.main}>
          <Switch>
            <Route exact path="/" component={Page} />
            <Route path="/:page" component={Page} />
          </Switch>
        </main>
        <aside className={style.sidebar}>
          <Link to="/">Getting Started</Link>
          <Link to="/principles">Guiding Principles</Link>
          <Link to="/contributing">Contribution Guidelines</Link>
          <Link to="/changelog">Changelog</Link>
          <div className="sidebar-sep" />
          <Link to="/tokens">Tokens</Link>
          <div className="sidebar-sep" />
          <Link to="/component-elements">Elements</Link>
          <Link to="/component-compounds">Compounds</Link>
          <Link to="/component-patterns">Patterns</Link>
          <Link to="/component-internals">Internals</Link>
        </aside>
        <footer className={style.footer}>&copy; 2018 - {new Date().getFullYear()} Myntra UIKit</footer>
      </div>
    </BrowserRouter>
  )
}
