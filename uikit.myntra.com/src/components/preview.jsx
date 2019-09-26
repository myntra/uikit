import React, { PureComponent, Suspense } from 'react'
import PropTypes from 'prop-types'
import * as components from '../uikit'

const shouldBeReady = Date.now() + 5000 // In 5 seconds of load.

export default class Preview extends PureComponent {
  static propTypes = {
    onError: PropTypes.func.isRequired,
    component: PropTypes.any
  }

  state = {
    fixedProxy: false
  }

  componentDidCatch(error) {
    this.props.onError(error)
  }

  componentDidUpdate() {
    this.props.onError(null)
  }

  componentDidMount() {
    // This is a hack to work with async component.

    if (shouldBeReady > Date.now()) {
      // Refreshing it!
      this.shouldBeReady = setTimeout(
        () => this.setState(state => ({ fixedProxy: !state.fixedProxy })),
        shouldBeReady - Date.now()
      )
    }
  }

  componentWillUnmount() {
    if (this.shouldBeReady) clearTimeout(this.shouldBeReady)
  }

  render() {
    const Component = this.props.component

    return (
      <Suspense
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Loading required UIKit components...
          </div>
        }
      >
        <div style={{ padding: '24px', marginTop: '24px', width: '750px' }}>
          {Component ? <Component context={{ ...React, ...components }} /> : null}
        </div>
      </Suspense>
    )
  }
}
