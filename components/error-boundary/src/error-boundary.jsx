import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Contains errors in child components.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category basic
 */
export default class ErrorBoundary extends Component {
  static propTypes = {
    /**
     * Render fallback content in case of error.
     */
    renderFallback: PropTypes.func,
    /**
     * Children elements.
     */
    children: PropTypes.node
  }

  static defaultProps = {
    renderFallback: () => <p>{'Oops!!! Something went wrong'}</p>
  }

  state = { hasError: false }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info })
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderFallback(this.state)
    }

    return this.props.children
  }
}
