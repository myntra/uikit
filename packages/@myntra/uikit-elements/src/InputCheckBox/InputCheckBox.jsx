import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './InputCheckBox.css'

/**
 * The input checkbox component
 * @since 0.0.0
 * @status EXPERIMENTAL
 * @example
 * <label>
 *  <InputCheckBox
 *   value={this.state.checked}
 *   onChange={checked => this.setState({ checked })}
 *  />
 *  I am a CheckBox
 * </label>
 */

function InputCheckBox({ className, value, htmlValue, onChange, ...props }) {
  return (
    <label className={classnames(className, 'input').use(styles)}>
      <input
        {...props}
        type="checkbox"
        checked={!!value}
        value={htmlValue}
        className={classnames('target').use(styles)}
        onChange={event => onChange && onChange(event.target.checked)}
      />
      <span className={classnames('checkbox').use(styles)} />
    </label>
  )
}

InputCheckBox.propTypes = {
  /** @private */
  className: PropTypes.string,

  /**
   * Value
   *
   * > **Why `value` instead of `checked`?**
   * >
   * > We have a set convention of having `value` as the controlled input value and `onChange` event to
   * propagate the change to parent component.
   */
  value: PropTypes.bool,

  /** Disabled state */
  disabled: PropTypes.bool,

  /**
   * Checkbox value attribute.
   *
   * > **Why `htmlValue` instead of `value`?**
   * >
   * > As per convention, value is used on Input components to set the controlled value.
   */
  htmlValue: PropTypes.string,

  /**
   * Event fired when clicked.
   * @function
   * @param {bool} checked
   */
  onChange: PropTypes.func
}

export default InputCheckBox
