import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IntersectionObserver from 'intersection-observer-polyfill'

import classnames from './image.module.scss'

export const OBSERVER = Symbol('Image Observer')

export function createObserver(root) {
  root = root || document.body
  if (root[OBSERVER]) return root[OBSERVER]

  let counter = 0
  const handlers = new WeakMap()
  const wrapper = (root[OBSERVER] = {
    handlers,
    observe(element, handler) {
      handlers.set(element, handler)
      observer.observe(element)
      counter++
    },
    unobserve(element) {
      observer.unobserve(element)
      handlers.delete(element)
      counter--

      if (counter === 0) {
        observer.disconnect()
        delete root[OBSERVER]
      }
    }
  })
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (handlers.has(entry.target)) {
          const fn = handlers.get(entry.target)
          fn(entry, observer)
        }
      })
    },
    { root: root === document.body ? null : root, rootMargin: '0px', threshold: 0 }
  )

  wrapper.raw = observer

  return wrapper
}

/**
 * A component to lazy load images.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 */

class Image extends Component {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    /** Image source */
    src: PropTypes.string,
    /** Image height */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Image width */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Lazy loading image */
    lazyLoad: PropTypes.bool
  }

  static defaultProps = {
    lazyLoad: true
  }

  constructor(props) {
    super(props)

    this.state = {
      status: 'loading',
      isIntersecting: false
    }

    this.ref = React.createRef()
  }

  componentDidMount() {
    this.downloadImage()
    this.attachIntersectionObserver()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.setState({ status: 'loading' })
      this.downloadImage()
    }
  }

  componentWillUnmount() {
    this.observer.unobserve(this.ref.current)
    delete this.observer
  }

  downloadImage() {
    const schedule = window.requestIdleCallback || (fn => setTimeout(fn, 1))

    schedule(
      /* istanbul ignore next: non-imperative code to preload image. */
      () => {
        const image = new window.Image()
        image.addEventListener('load', () => this.setState({ status: 'loaded' }), false)
        image.addEventListener('error', () => this.setState({ status: 'failed' }), false)
        image.src = this.props.src
      },
      { timeout: 50 }
    )
  }

  attachIntersectionObserver() {
    if (!this.props.lazyLoad) {
      this.setState({ isIntersecting: true })
    } else if (this.ref.current) {
      ;(this.observer = createObserver(this.ref.current.offsetParent)).observe(
        this.ref.current,
        this.handleIntersection
      )
    }
  }

  handleIntersection = entry => {
    if (entry.isIntersecting) {
      this.setState({ isIntersecting: true })
      this.observer.unobserve(this.ref.current)
    }
  }

  render() {
    const { className, lazyLoad, height, width, ...props } = this.props
    const { status, isIntersecting } = this.state

    return (
      <div ref={this.ref} className={classnames('image-container', { 'bg-error': status === 'failed' })}>
        {isIntersecting && status === 'loaded' ? (
          <img
            {...props}
            key="image"
            height={height}
            width={width}
            className={classnames(className, 'img', status)}
          />
        ) : (
          <img
            {...props}
            key="image"
            height={height}
            width={width}
            src={'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='}
          />
        )}
      </div>
    )
  }
}

export default Image
