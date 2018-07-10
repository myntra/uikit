import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { onlyExtraProps, classnames } from '@myntra/uikit-utils'

import ClickAway from '../ClickAway/ClickAway'
import Button from '../Button/Button'

import styles from './Dropdown.css'

/**
 A bare-bones dropdown implementation. It requires a trigger component or text.

 @since 0.0.0
 @status EXPERIMENTAL
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
    /** Dropdown state */
    isOpen: PropTypes.bool.isRequired,
    /**
     * Event fired when dropdown drawer is displayed
     * @type {function(): void}
     */
    onOpen: PropTypes.func,
    /**
     * Event fired when dropdown drawer is closed
     * @type {function(): void}
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
    _combination: props => {
      const positions = ['up', 'left', 'right'].filter(it => it in props)

      if (props.auto && positions.length) {
        throw new Error(`Prop 'auto' cannot be used with ${positions.join(', ')}.`)
      }

      if (props.left && props.right) {
        throw new Error(`Use one of 'left' or 'right'.`)
      }
    }
  }

  static defaultProps = {
    approxContentHeight: 320,
    approxContentWidth: 240
  }

  constructor(props) {
    super(props)

    this.state = { up: false, left: false, right: false }
    this.wrapper =
      typeof React.createRef === 'function'
        ? React.createRef()
        : ref => {
            this.wrapper.current = ref
          }
    this.content = ref => {
      this.content.ref = ref

      if (ref) {
        const rect = ref.getBoundingClientRect()

        this.lastHeight = rect.height
        this.lastWidth = rect.width
      }
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
    if (this.props.auto) {
      this.setState(this.calculateAutoPosition(this.wrapper.current, document.body))
    }

    this.props.onOpen && this.props.onOpen()
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

  /**
   * Calculate auto position.
   */
  calculateAutoPosition(element, parent) {
    if (!element || !parent) {
      return { up: false, left: false, right: false }
    }

    const target = element.getBoundingClientRect()
    const reference = parent.getBoundingClientRect()

    const height = this.lastHeight || this.props.approxContentHeight
    const width = this.lastWidth || this.props.approxContentWidth

    const maxWidth = reference.right
    const maxHeight = reference.bottom

    // Choose:
    const up = target.bottom + height >= maxHeight && target.top - height > 0
    const left = target.left + width < maxWidth
    const right = target.right - width > 0

    return { up, left, right: left ? false : right }
  }

  render() {
    const { up, left, right } = this.props.auto ? this.state : this.props

    return (
      <div
        {...this.forwardedProps}
        className={classnames(this.props.className, 'dropdown', { open: this.props.isOpen }).use(styles)}
        ref={this.wrapper}
      >
        <div className={classnames('trigger').use(styles)}>
          {typeof this.props.trigger === 'string' ? (
            <Button label={this.props.trigger} secondaryIcon="chevron-down" onBlur={this.close} onClick={this.toggle} />
          ) : (
            React.cloneElement(this.props.trigger, { onBlur: this.close, onFocus: this.open, onClick: this.toggle })
          )}
        </div>
        {this.props.isOpen && (
          <div className={classnames('content', { up, left, right }).use(styles)} ref={this.content}>
            {this.props.children}
          </div>
        )}
        {this.props.isOpen && <ClickAway target={this.wrapper} onClickAway={this.close} />}
      </div>
    )
  }
}

export default Dropdown
