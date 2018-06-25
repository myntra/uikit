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
   value={this.state.checked}
   onChange={checked => this.setState({checked})}
 />
 */
function InputSwitch({ className, onChange, value, ...props }) {
  return (
    <label className={classnames(className, 'input').use(styles)}>
      <input
        {...props}
        type="checkbox"
        checked={!!value}
        className={classnames('switch-input').use(styles)}
        onChange={event => onChange && onChange(event.target.checked)}
      />
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
  value: PropTypes.bool,

  /**
   * Event fired when checked attribute of switch is changed.
   * @function
   * @param {boolean} checked
   */
  onChange: PropTypes.func,

  /**
   * Disabled
   * @type boolean
   */
  disabled: PropTypes.bool,

  /** @private */
  className: PropTypes.string
}

export default InputSwitch
