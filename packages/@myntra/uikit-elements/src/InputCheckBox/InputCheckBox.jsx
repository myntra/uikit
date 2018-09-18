import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './InputCheckBox.module.css'

/**
 * The input checkbox component
 * @since 0.0.0
 * @status REVIEWING
 * @example
 *  <InputCheckBox
 *   value={this.state.checked}
 *   onChange={checked => this.setState({ checked })}
 *   title="I am a CheckBox"
 *  />
 */

function InputCheckBox({ className, value, htmlValue, onChange, title, ...props }) {
  return (
    <label className={classnames(className, 'input').use(styles)}>
      <div className={classnames('checkbox-input').use(styles)} role="checkbox">
        <input
          {...props}
          type="checkbox"
          checked={!!value}
          value={htmlValue}
          className={classnames('target').use(styles)}
          onChange={event => onChange && onChange(Boolean(event.target.checked))}
        />
        <span className={classnames('checkbox').use(styles)} />
      </div>
      <span className={classnames('content').use(styles)}>{title}</span>
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
  onChange: PropTypes.func,
  /**
   * Component to render title for the checkbox
   */
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default InputCheckBox
