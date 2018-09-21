/* globals CURRENT_BRANCH */
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, withRouter } from 'react-router-dom'
import App from './App'

const RouterApp = withRouter(App)

render(
  <BrowserRouter basename={CURRENT_BRANCH}>
    <RouterApp />
  </BrowserRouter>,
  document.getElementById('app')
)
