import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'
import styles from './InputText.css'

/**
 The InputText component.
 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <InputText value={this.state.value} onChange={value => this.setState({ value })} />
 */
const InputText = ({ className, onChange, value, ...props }) => {
  return (
    <div className={className}>
      <input
        {...props}
        value={typeof value !== 'string' ? '' : value}
        onChange={event => onChange && onChange(event.target.value)}
        className={classnames('input').use(styles)}
      />
    </div>
  )
}

InputText.propTypes = {
  /** Type */
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url']),
  /** @private */
  className: PropTypes.string,
  /** Disable Input */
  disabled: PropTypes.bool,
  /** Value */
  value: PropTypes.string,
  /**
   * Handler for change event
   * @function
   * @param {string} value
   */
  onChange: PropTypes.func
}

InputText.defaultProps = {
  type: 'text',
  disabled: false
}

export default InputText
