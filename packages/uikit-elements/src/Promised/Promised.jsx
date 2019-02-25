import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
  The `<Promised>` component makes asynchronous programming declarative.
  @since 0.0.0
  @status REVIEWING
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
    /**
     * A function returning promise or promise.
     *
     * @function
     * @returns {Promise}
     */
    fn: PropTypes.func.isRequired,
    /**
     * A component to render loading state.
     *
     * @function
     * @returns {React.Element}
     */
    renderLoading: PropTypes.func,
    /**
     * A component to render error state.
     *
     * @function
     * @param {Error} error
     * @returns {React.Element}
     */
    renderError: PropTypes.func,
    /**
     * A component to render when promise is resolved.
     *
     * @function
     * @param {any} value
     * @returns {React.Element}
     */
    render: PropTypes.func.isRequired,
    /**
     * Callback when promise is resolved.
     */
    onResolve: PropTypes.func,
    /**
     * Callback when promise is rejected.
     */
    onReject: PropTypes.func
  }

  static defaultProps = {
    renderLoading: () => <span className="promise-loading" />,
    renderError: error => <span className="promise-error">{error.message}</span>,
    onResolve: () => {},
    onReject: () => {}
  }

  state = {
    resolved: null,
    rejected: null
  }

  constructor(props) {
    super(props)
    this.hook()
  }

  componentDidUpdate(props) {
    if (this.props.fn !== props.fn) {
      this.hook()
    }
  }

  componentWillUnmount() {
    this.cancel()
  }

  /**
   * Hook in then/catch handlers.
   *
   * @returns {void}
   */
  hook() {
    if (this.cancel) this.cancel()

    this.cancel = this.createCancelablePromise(this.props.fn)
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

    const result = fn()
    Promise.resolve(result)
      .then(resolved => {
        if (isCancelled) return
        this.setState({ resolved, rejected: null })
        this.props.onResolve(resolved)
      })
      .catch(rejected => {
        if (isCancelled) return
        this.setState({ rejected, resolved: null })
        this.props.onReject(rejected)
      })

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
