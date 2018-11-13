/* globals CURRENT_BRANCH */
import React, { unstable_Profiler as Profiler } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, withRouter } from 'react-router-dom'
import App from './App'
import { unstable_trace as trace } from 'scheduler/tracing'

const RouterApp = withRouter(App)

trace('initial render', window.performance.now(), () =>
  render(
    <Profiler id="Application" onRender={(...args) => {}}>
      <BrowserRouter basename={CURRENT_BRANCH}>
        <RouterApp />
      </BrowserRouter>
    </Profiler>,
    document.getElementById('app')
  )
)
