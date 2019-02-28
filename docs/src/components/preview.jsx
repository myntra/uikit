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

  render() {
    const Component = this.props.component

    return <Suspense fallback={<div>Loading components...</div>}>
      <div style={{ padding: '24px' }}>{Component ? <Component context={{ ...React, ...components }} /> : null}</div>
    </Suspense>
  }
}
