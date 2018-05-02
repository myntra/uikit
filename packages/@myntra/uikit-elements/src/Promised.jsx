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
    /**
     * A component to render when promise is resolved.
     */
    render: PropTypes.func,
    /** Callback when promise is resolved. */
    onResolve: PropTypes.func,
    /** Callback when promise is rejected. */
    onReject: PropTypes.func
  }

  static defaultProps = {
    renderLoading: () => <span className="promise-loading" />,
    renderError: error => <span className="promise-error">{error.message}</span>
  }

  state = {
    resolved: null,
    rejected: null
  }

  constructor(props) {
    super(props)
    this.hook(props.fn)
  }

  componentWillReceiveProps(props, state) {
    if (this.props.fn !== props.fn) {
      this.setState({ resolved: null, rejected: null }, () => this.hook(props.fn))
    }
  }

  componentWillUnmount() {
    if (this.cancel) this.cancel()
  }

  /**
   * Hook in then/catch handlers.
   *
   * @private
   * @argument {function(): Promise<object>} fn
   * @returns {void}
   */
  hook(fn) {
    if (this.cancel) this.cancel()

    this.cancel = this.createCancelablePromise(fn)
  }

  /**
   * Create cancelable promise factory.
   *
   * @private
   * @argument {function(): Promise<T>} fn
   * @returns {Promise.<T>}
   * @template T
   */
  createCancelablePromise(fn) {
    let isCancelled = false

    Promise.resolve(fn())
      .then(resolved => !isCancelled && this.setState({ resolved, rejected: null }, this.props.onResolve))
      .catch(rejected => !isCancelled && this.setState({ rejected }, this.props.onReject))

    return () => {
      isCancelled = true
    }
  }

  render() {
    if (this.state.rejected) return this.props.renderError(this.state.rejected)
    if (this.state.resolved) return this.props.render(this.state.resolved)
    return this.props.renderLoading()
  }
}
