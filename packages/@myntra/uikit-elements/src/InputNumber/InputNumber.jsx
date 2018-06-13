import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'
import styles from './InputNumber.css'

/**
 * The InputNumber component.
 * @since 0.0.0
 * @status EXPERIMENTAL
 * @example
 * <InputNumber value={this.state.value} onChange={value => { this.setState({ value }) }} />
 */
const InputNumber = ({ className, onChange, value, ...props }) => {
  return (
    <div className={className}>
      <input
        {...props}
        type="number"
        value={typeof value !== 'number' ? '' : value}
        className={classnames('input').use(styles)}
        onChange={event => onChange && onChange(parseFloat(event.target.value))}
      />
    </div>
  )
}

InputNumber.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** Disable Input */
  disabled: PropTypes.bool,
  /** Value */
  value: PropTypes.number,
  /**
   * Change event handler
   * @function
   * @param {number} value
   */
  onChange: PropTypes.func
}

InputNumber.defaultProps = {
  disabled: false
}

export default InputNumber
