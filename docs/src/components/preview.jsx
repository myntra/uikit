import React, { PureComponent, Suspense } from 'react'
import PropTypes from 'prop-types'
import * as components from "../uikit";

export default class Preview extends PureComponent {
  static propTypes = {
    onError: PropTypes.func.isRequired,
    component: PropTypes.any
  }

  componentDidCatch(error) {
    this.props.onError(error)
  }

  componentDidUpdate() {
    this.props.onError(null)
  }

  render() {
    const Component = this.props.component

    return <Suspense fallback={<div>Loading required UIKit components...</div>}>
      <div style={{ padding: '24px' }}>{Component ? <Component context={{ ...React, ...components }} /> : null}</div>
    </Suspense>
  }
}
