import React, { Component } from 'react'
import IntersectionObserverPolyfill from 'intersection-observer-polyfill'

import classnames from './image.module.scss'

export const OBSERVER = Symbol('Image Observer')

interface ImageContainerObserver {
  observe(
    element: HTMLElement,
    handler: (
      entry: IntersectionObserverEntry,
      observer: IntersectionObserver
    ) => void
  ): void
  unobserve(element: HTMLElement): void
  raw: IntersectionObserver
}

export function createObserver(root: Element): ImageContainerObserver {
  root = root || document.body
  if (root[OBSERVER]) return root[OBSERVER]

  let counter = 0
  const handlers = new WeakMap()

  const wrapper = {
    observe(
      element: HTMLElement,
      handler: (
        entry: IntersectionObserverEntry,
        observer: IntersectionObserver
      ) => void
    ) {
      handlers.set(element, handler)
      wrapper.raw.observe(element)
      counter++
    },
    unobserve(element: HTMLElement) {
      wrapper.raw.unobserve(element)
      handlers.delete(element)
      counter--

      if (counter === 0) {
        wrapper.raw.disconnect()
        delete root[OBSERVER]
      }
    },
    raw: new IntersectionObserverPolyfill(
      (entries) => {
        entries.forEach((entry) => {
          if (handlers.has(entry.target)) {
            const fn = handlers.get(entry.target)
            fn(entry, wrapper.raw)
          }
        })
      },
      {
        root: root === document.body ? null : root,
        rootMargin: '0px',
        threshold: 0
      }
    )
  }

  root[OBSERVER] = wrapper

  return wrapper
}

interface ImageProps extends BaseProps {
  /** Image source file/link. */
  src: string
  /** Image height */
  height: number | string
  /** Image width */
  width: number | string
  /**
   * Lazy loading image
   * @private
   * @deprecated
   */
  lazyLoad: boolean
  /** Lazy load image */
  lazy: boolean
}

/**
 * A component to lazy load images.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 */
class Image extends Component<
  ImageProps,
  { status: string; isIntersecting: boolean }
> {
  static defaultProps = {
    lazyLoad: true
  }

  ref: React.RefObject<HTMLDivElement>
  observer?: ImageContainerObserver

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
    const { Image, requestIdleCallback } = window as any
    const schedule = requestIdleCallback || ((fn) => setTimeout(fn, 1))

    schedule(
      () => {
        const image: HTMLImageElement = new Image()
        image.addEventListener(
          'load',
          () => this.setState({ status: 'loaded' }),
          false
        )
        image.addEventListener(
          'error',
          () => this.setState({ status: 'failed' }),
          false
        )
        image.src = this.props.src
      },
      { timeout: 50 }
    )
  }

  get isLazy() {
    if ('lazyLoad' in this.props) {
      if (__DEV__) {
        console.warn(`The prop 'lazyLoad' is deprecated.`)
      }

      return this.props.lazyLoad
    }

    return this.props.lazy
  }

  attachIntersectionObserver() {
    if (!this.isLazy) {
      this.setState({ isIntersecting: true })
    } else if (this.ref.current) {
      this.observer = createObserver(this.ref.current.offsetParent)
      this.observer.observe(this.ref.current, this.handleIntersection)
    }
  }

  handleIntersection = (entry) => {
    if (entry.isIntersecting) {
      this.setState({ isIntersecting: true })
      if (this.observer) {
        this.observer.unobserve(this.ref.current)
      }
    }
  }

  render() {
    const { className, lazyLoad, lazy, height, width, ...props } = this.props
    const { status, isIntersecting } = this.state

    return (
      <div
        ref={this.ref}
        className={classnames('image-container', {
          'bg-error': status === 'failed'
        })}
      >
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
            src={
              'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
            }
          />
        )}
      </div>
    )
  }
}

export default Image
