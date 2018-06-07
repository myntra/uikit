import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './InputSwitch.css'

/**
 Switch component that is implemented using an input checkbox as the controller.

 @since 0.0.0
 @status READY
 @example
 <InputSwitch
   checked={this.state.checked}
   onChange={(event) => this.setState({checked: event.target.checked})}
 />
 */
function InputSwitch(props) {
  const { className, ...restProps } = props
  return (
    <label className={className}>
      <input {...restProps} type="checkbox" hidden className={classnames('switch-input').use(styles)} />
      <span className={classnames('switch-track').use(styles)}>
        <span className={classnames('switch-thumb').use(styles)} />
      </span>
    </label>
  )
}

InputSwitch.propTypes = {
  /**
   * Attribute to indicate whether the switch is selected
   * @type boolean
   */
  checked: PropTypes.bool,
  /**
   * Disabled
   * @type boolean
   */
  disabled: PropTypes.bool,
  /**
   * Optional classname
   * @private
   * @type boolean
   */
  className: PropTypes.string,
  /**
   * Event fired when checked attribute of switch is changed.
   * @type {function(SyntheticEvent):void}
   */
  onChange: PropTypes.func
}

export default InputSwitch
