import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
  The `<Promised>` component makes asynchronous programming declarative.
  @since 0.0.0
  @status EXPERIMENTAL
  @example
  <Promised
    fn={() => fetch('http://api.icndb.com/jokes/random').then(response => response.json())}
    renderLoading={() => <span>Loading</span>}
    renderError={({ message }) => <span>Error: {message}</span>}
    render={({ value }) => <span>{ value && value.joke }</span>}
  />
*/
export default class Promised extends Component {
  static propTypes = {
    /** A function returning promise or promise. */
    fn: PropTypes.func.isRequired,
    /** A component to render loading state. */
    renderLoading: PropTypes.func,
    /** A component to render error state. */
    renderError: PropTypes.func,
    /** A component to render when promise is resolved. */
    render: PropTypes.func
  }

  static defaultProps = {
    renderLoading: () => <span className="promise-loading" />,
    renderError: error => <span className="promise-error">{error.message}</span>
  }

  constructor(props) {
    super(props)

    this.state = {
      resolved: null,
      rejected: null
    }

    this.hook(props.fn)
  }

  componentWillReceiveProps(props) {
    if (this.props.fn !== props.fn) {
      this.setState({ isResolved: null, isRejected: null }, () => this.hook(props.fn))
    }
  }

  /**
   * Hook in then/catch handlers.
   *
   * @private
   * @deprecated
   * @argument {function(): Promise<object>} promise
   * @returns {void}
   */
  hook(promise) {
    Promise.resolve(promise())
      .then(resolved => this.setState({ resolved, rejected: null }))
      .catch(rejected => this.setState({ rejected }))
  }

  render() {
    if (this.state.rejected) return this.props.renderError(this.state.rejected)
    if (this.state.resolved) return this.props.render(this.state.resolved)
    return this.props.renderLoading()
  }
}
