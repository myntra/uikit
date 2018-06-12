import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import IntersectionObserver from 'intersection-observer-polyfill'
import { isEqualShallow } from '@myntra/uikit-utils'

/**
 It is declarative-way of using [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). It can be used for cases like, virtualized-list, infinite-scroll, lazy-loading or animations when an element enters the viewport.

 @since 0.0.0
 @status EXPERIMENTAL
 @example
if (!this.ref) {
  this.setState({ intersectionRatio: 0, isIntersecting: false, status: 'unknown' })
  this.ref = React.createRef()
}

<div>
  <p>Scroll to bottom right corner!</p>
  <div style={{ height: '200px', width: '200px', overflow: 'auto' }} ref={this.ref}>
    <div style={{ height: '400px', width: '400px', background: '#efefef' }} />
    <Intersection
      root={this.ref}
      threshold={[0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]}
      onEnter={() => this.setState({ status: 'entered' })}
      onLeave={() => this.setState({ status: 'left' })}
      onIntersection={({ isIntersecting, intersectionRatio }) => this.setState({ intersectionRatio, isIntersecting })}
    >
      <div ref={this.ref} style={{ padding: '20px', margin: '100px', width: '200px', background: 'red' }} />
    </Intersection>
    <div style={{ height: '400px', width: '400px', background: '#efefef' }} />
  </div>
  <p>
    Visibility: {this.state.intersectionRatio * 100}% <br />
    Intersecting: {''+this.state.isIntersecting} <br />
    Status: {this.state.status}
  </p>
</div>
 */
class Intersection extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * The element that is used as the viewport for checking visibility of the target. Must be a React reference to an ancestor element of the target.
     * Defaults to the browser viewport if not specified or if `null`.
     */
    root: PropTypes.shape({
      current: PropTypes.instanceOf(HTMLElement) // eslint-disable-line no-undef
    }),
    /**
     * Margin around the root. Can have values similar to the CSS margin property, e.g. `"10px 20px 30px 40px"` (top, right, bottom, left).
     * The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before
     * computing intersections. Defaults to all zeros.
     */
    rootMargin: PropTypes.string,
    /**
     * Either a single number or an array of numbers which indicate at what percentage of the target's visibility
     * the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark,
     * you can use a value of `0.5`. If you want the callback run every time visibility passes another 25%, you would
     * specify the array `[0, 0.25, 0.5, 0.75, 1]`. The default is 0 (meaning as soon as even one pixel is visible,
     * the callback will be run). A value of `1.0` means that the threshold isn't considered passed until every pixel is visible.
     */
    threshold: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    /**
     * Event fired when observed element enters the root element.
     * [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
     * @function
     * @param {IntersectionObserverEntry} entry
     */
    onEnter: PropTypes.func,
    /**
     * Event fired when observed element leaves the root element.
     * @function
     * @param {IntersectionObserverEntry} entry
     */
    onLeave: PropTypes.func,
    /**
     * Event fired when observed element intersection value changes.
     * @function
     * @param {IntersectionObserverEntry} entry
     */
    onIntersection: PropTypes.func,
    /** Enter and Leave events should be fired only once. */
    once: PropTypes.bool
  }

  static defaultProps = {
    rootMargin: '0px 0px 0px 0px',
    threshold: [0, 0.2]
  }

  constructor(props) {
    super(props)
    this.ref = current => {
      this.ref.current = current
    }
  }

  componentDidMount() {
    this.startObserver()
    this.observer.observe(this.ref.current)
  }

  componentWillUnmount() {
    this.stopObserver()
  }

  componentDidUpdate(prevProps) {
    if (this.hasOptionsChanged(this.props, prevProps)) {
      this.stopObserver()
      this.startObserver()
    }
    this.observer.observe(this.ref.current)
    this.lastEntry = null
  }

  hasOptionsChanged(newProps, oldProps) {
    return (
      newProps.rootMargin !== oldProps.rootMargin ||
      !isEqualShallow(newProps.threshold, oldProps.threshold) ||
      (this.observer && newProps.root ? this.observer.root !== newProps.root.current : false)
    )
  }

  handleIntersection = entries => {
    const target = entries[entries.length - 1]

    if (this.props.once && this.lastEntry) {
      if (this.lastEntry.isIntersecting && !target.isIntersecting) {
        this.props.onLeave && this.props.onLeave(target)
      } else if (!this.lastEntry.isIntersecting && target.isIntersecting) {
        this.props.onEnter && this.props.onEnter(target)
      }
    } else {
      if (target.isIntersecting) this.props.onEnter && this.props.onEnter(target)
      else this.props.onLeave && this.props.onLeave(target)
    }

    this.lastEntry = target // remember entry to check enter/leave on next event.
    this.props.onIntersection && this.props.onIntersection(target)
  }

  startObserver() {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.props.threshold,
      root: this.props.root ? this.props.root.current : null,
      rootMargin: this.props.rootMargin
    })
  }

  stopObserver() {
    this.observer.disconnect()
    this.observer = null
  }

  render() {
    return React.cloneElement(Children.only(this.props.children), { ref: this.ref })
  }
}

export default Intersection
