import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { onlyExtraProps } from '@myntra/uikit-utils'

import ClickAway from '../ClickAway/ClickAway'
import Button from '../Button/Button'

import classnames from './Dropdown.module.css'
import { Measure, Portal } from '../index'

const scrollParents = new WeakMap()

function elementHasOverflow(el) {
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
}

function elementHasScrollableOverflow(el) {
  const RE = /auto|scroll/
  const style = window.getComputedStyle(el, null)

  return RE.test(style.overflow + style.overflowX + style.overflowY)
}

function findScrollParents(el) {
  if (scrollParents.has(el)) return scrollParents.get(el)

  const parents = []
  let current = el.parentElement
  while (current) {
    if (elementHasOverflow(current) || elementHasScrollableOverflow(current)) {
      parents.push(current)
    }

    current = current.parentElement
  }

  if (!parents.length) {
    parents.push(document.scrollingElement || document.documentElement)
  }

  parents.push(window)

  scrollParents.set(el, parents)

  return parents
}

/**
 A bare-bones dropdown implementation. It requires a trigger component or text.

 @since 0.0.0
 @status REVIEWING
 @example
  <Dropdown trigger="Open" isOpen={this.state.isOpen} auto
    onOpen={() => this.setState({ isOpen: true })}
    onClose={() => this.setState({ isOpen: false })}
  >
    <div style={{ padding: '100px', background: 'white', boxShadow: '0 0 10px 0 rgba(0, 0, 0, .34)' }}>
      Anything here!
      <p>Yes. Anything!</p>
    </div>
  </Dropdown>
 */
class Dropdown extends Component {
  static propTypes = {
    /** Contents of the dropdown drawer. */
    children: PropTypes.element.isRequired,
    /** @private */
    className: PropTypes.string,
    /** Trigger to open dropdown. */
    trigger: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]).isRequired,
    /** Attach child to specific component/element */
    container: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.instanceOf(HTMLElement)]), // eslint-disable-line no-undef
    /** Dropdown state */
    isOpen: PropTypes.bool.isRequired,
    /**
     * Event fired when dropdown drawer is displayed
     * @function
     */
    onOpen: PropTypes.func,
    /**
     * Event fired when dropdown drawer is closed
     * @function
     */
    onClose: PropTypes.func,
    /** Open dropdown drawer above the trigger. */
    up: PropTypes.bool,
    /** Align dropdown drawer with the right edge of the trigger. */
    right: PropTypes.bool,
    /** Align dropdown drawer with the left edge of the trigger. */
    left: PropTypes.bool,
    /**
     * Position dropdown drawer in best suited place.
     */
    auto: PropTypes.bool,
    /** Used to detect position on first render. In further, renders actual height of DOM element is used. */
    approxContentHeight: PropTypes.number,
    /** Used to detect position on first render. In further, renders actual width of DOM element is used. */
    approxContentWidth: PropTypes.number,
    /** @private */
    useClickAway: PropTypes.bool,
    /** @private */
    _combination: props => {
      const positions = ['up', 'left', 'right'].filter(it => it in props)

      if (props.auto && positions.length) {
        throw new Error(`Prop 'auto' cannot be used with ${positions.join(', ')}.`)
      }
    }
  }

  static defaultProps = {
    approxContentHeight: 320,
    approxContentWidth: 240,
    useClickAway: true
  }

  constructor(props) {
    super(props)

    this.state = {
      up: false,
      left: false,
      right: false,
      height: props.approxContentHeight,
      width: props.approxContentWidth,
      position: null
    }
    this.wrapperRef =
      typeof React.createRef === 'function'
        ? React.createRef()
        : ref => {
            this.wrapperRef.current = ref
          }
    this.triggerRef =
      typeof React.createRef === 'function'
        ? React.createRef()
        : ref => {
            this.triggerRef.current = ref
          }
  }

  /**
   * Get extra props other than props defined in propsTypes.
   * @method
   * @param {Object.<string, any>} props
   * @returns {Object.<string, any>}
   */
  filterForwardedProps = onlyExtraProps(Dropdown.propTypes)

  /**
   * Extra props that are not defined in propTypes.
   *
   * @type {Object.<string, any>}
   * @readonly
   */
  get forwardedProps() {
    return this.filterForwardedProps(this.props)
  }

  componentWillUnmount() {
    this._clearScrollHandler && this._clearScrollHandler() // clean any scroll events.
  }

  /**
   * Ignore consecutive events.
   *
   * @returns {boolean}
   */
  shouldCancelEvent() {
    const shouldCancelEvent = this.coolDownTimer > 0

    clearTimeout(this.coolDownTimer)
    this.coolDownTimer = setTimeout(() => {
      this.coolDownTimer = 0
    }, 200 /* cool down timeout */)

    return shouldCancelEvent
  }

  /**
   * Open dropdown content drawer.
   *
   * @returns {void}
   */
  open = () => {
    if (this.shouldCancelEvent()) return
    this.positionContent()

    this.props.onOpen && this.props.onOpen()
  }

  positionContent() {
    if (this.props.auto || this.props.container) {
      setTimeout(() => this.setState(this.calculateAutoPosition(this.triggerRef.current, document.body)), 1)
    }
  }

  /**
   * Close dropdown content drawer.
   *
   * @returns {void}
   */
  close = () => {
    if (this.shouldCancelEvent()) return
    this.props.onClose && this.props.onClose()
  }

  /**
   * Toggle dropdown content drawer state.
   *
   * @returns {void}
   */
  toggle = () => {
    this.props.isOpen ? this.close() : this.open()
  }

  handleMeasure = ({ bounds: { width, height } }) => {
    if ((width && height && this.state.width !== width) || this.state.height !== height) {
      this.setState({ width, height })
      this.positionContent()
    }
  }

  /**
   * Calculate auto position.
   */
  calculateAutoPosition(element, parent) {
    if (!element || !parent) {
      return { up: false, left: false, right: false }
    }

    const target = element.getBoundingClientRect()
    const reference = parent.getBoundingClientRect()

    const { height, width } = this.state
    const { auto } = this.props

    const maxWidth = reference.width
    const maxHeight = reference.height

    // Choose:
    const up = auto ? target.bottom + height >= maxHeight && target.top - height > 0 : this.props.up
    const left = auto ? target.left + width < maxWidth : this.props.left
    const right = auto ? (left ? false : target.right - width > 0) : this.props.right

    const layout = { up, left, right }

    // Absolute position when using portal.
    if (this.props.container) {
      return this.calculateAbsolutePosition(layout)
    }

    return layout
  }

  calculateAbsolutePosition({ up, left, right }) {
    const trigger = this.triggerRef.current
    const rect = trigger.getBoundingClientRect()
    const { height, width } = this.state

    const position = { top: rect.top, left: rect.left }

    if (up) {
      position.top -= height
    } else {
      position.top += rect.height
    }

    if (right && left) {
      position.right = position.left + rect.width
      position.content = { width: rect.width }
    } else if (right) {
      position.left += rect.width - width
    }

    // Register scroll handler.
    const recomputePosition = () => {
      const offsetTop = position.top - rect.top
      const offsetLeft = position.left - rect.left
      const newRect = trigger.getBoundingClientRect()

      const newPosition = {
        left: newRect.left + offsetLeft,
        top: newRect.top + offsetTop
      }

      if (position.right) {
        newPosition.right = newPosition.left + newRect.width
        newPosition.content = {
          width: newRect.width
        }
      }

      this.setState({ position: newPosition })
    }

    const scrollParents = findScrollParents(trigger)

    // Clear old scroll events.
    this._clearScrollHandler && this._clearScrollHandler()
    this._clearScrollHandler = () =>
      scrollParents.map(scroll => scroll.removeEventListener('scroll', recomputePosition))

    scrollParents.map(scroll => scroll.addEventListener('scroll', recomputePosition, { passive: true }))

    return { up, left, right, position }
  }

  render() {
    const { up, left, right } = this.props.auto ? this.state : this.props
    const { position } = this.state

    return (
      <div
        {...this.forwardedProps}
        className={classnames(this.props.className, 'dropdown', {
          open: this.props.isOpen
        })}
      >
        <div
          className={classnames('trigger')}
          ref={this.triggerRef}
          onClick={event => event.stopPropagation()}
          data-test-id="trigger"
        >
          {typeof this.props.trigger === 'string' ? (
            <Button label={this.props.trigger} secondaryIcon="chevron-down" onBlur={this.close} onClick={this.toggle} />
          ) : (
            React.cloneElement(this.props.trigger, {
              onBlur: this.props.trigger.props.onBlur || this.close,
              onFocus: this.open,
              onClick: this.toggle
            })
          )}
        </div>
        {this.props.isOpen &&
          (this.props.container ? (
            <Portal container={this.props.container} data-test-id="portal">
              <div
                className={classnames('content', 'fixed')}
                style={position}
                ref={this.wrapperRef}
                hidden={!position}
                data-test-id="content"
              >
                <Measure bounds onMeasure={this.handleMeasure}>
                  <div className={classnames('content-wrapper')} style={position && position.content}>
                    {this.props.children}
                  </div>
                </Measure>
              </div>
            </Portal>
          ) : (
            <Measure bounds onMeasure={this.handleMeasure}>
              <div className={classnames('content', { up, left, right })} ref={this.wrapperRef} data-test-id="content">
                {this.props.children}
              </div>
            </Measure>
          ))}
        {this.props.useClickAway &&
          this.props.isOpen && (
            <ClickAway target={this.wrapperRef} onClickAway={this.close} data-test-id="click-away" />
          )}
      </div>
    )
  }
}

export default Dropdown
