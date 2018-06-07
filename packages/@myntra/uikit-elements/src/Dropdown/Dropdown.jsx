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
<Dropdown trigger="Open">
  Anything here!
  <p>Yes. Anything!</p>
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
    left: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.wrapper = React.createRef()
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
   * Close dropdown content drawer.
   *
   * @returns {void}
   */
  close = () => {
    this.setState({ isOpen: false }, this.props.onClose)
  }

  /**
   * Toggle dropdown content drawer state.
   *
   * @returns {void}
   */
  toggle = () => {
    this.setState(state => ({ isOpen: !state.isOpen }), this.state.isOpen ? this.props.onClose : this.props.onOpen)
  }

  render() {
    const { up, left, right } = this.props

    return (
      <div
        {...this.forwardedProps}
        className={classnames(this.props.className, 'dropdown', { open: this.state.isOpen }).use(styles)}
        ref={this.wrapper}
      >
        <div className={classnames('trigger').use(styles)} onClick={this.toggle}>
          {typeof this.props.trigger === 'string' ? (
            <Button label={this.props.trigger} secondaryIcon="alert" />
          ) : (
            this.props.trigger
          )}
        </div>
        {this.state.isOpen && (
          <div className={classnames('content', { up, left, right }).use(styles)}>{this.props.children}</div>
        )}
        {this.state.isOpen && <ClickAway target={this.wrapper} onClickAway={this.close} />}
      </div>
    )
  }
}

export default Dropdown
