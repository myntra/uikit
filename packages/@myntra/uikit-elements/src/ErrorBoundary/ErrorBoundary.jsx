import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 Contains errors in child components.

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <ErrorBoundary>
  // ErrorBoundary.ExperimentalComponent throws some error.
  <ErrorBoundary.ExperimentalComponent />
 </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  static propTypes = {
    /** Error message */
    message: PropTypes.string,
    /** Error message slot */
    renderMessage: PropTypes.func,
    /** Child node */
    children: PropTypes.node
  }

  state = { hasError: false }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info })
    // TODO: push error metric.
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderMessage ? (
        this.props.renderMessage(this.state)
      ) : (
        <p>{this.props.message || 'Oops!!! Something went wrong'}</p>
      )
    }

    return this.props.children
  }
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  ErrorBoundary.ExperimentalComponent = function ExperimentalComponent(props) {
    return <div>{props.foo.bar}</div> // eslint-disable-line
  }
}
