import React from 'react'

import PropTypes from 'prop-types'
import classnames from './InputText.module.css'

/**
 The InputText component.
 @since 0.0.0
 @status REVIEWING
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
        className={classnames('input')}
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
