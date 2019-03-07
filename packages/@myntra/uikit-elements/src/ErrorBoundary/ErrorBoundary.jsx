import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 Contains errors in child components.

 @since 0.0.0
 @status REVIEWING
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
    /**
     * Error message slot
     * @function
     * @param {{ error: Error, info: object }} props
     * @returns {React.Element}
     */
    renderMessage: PropTypes.func,
    /** Child node */
    children: PropTypes.node
  }

  state = { hasError: false }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info })
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

ErrorBoundary.ExperimentalComponent = function ExperimentalComponent(props) {
  return <div>{props.foo.bar}</div> // eslint-disable-line
}
