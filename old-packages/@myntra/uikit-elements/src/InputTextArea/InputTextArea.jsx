import React from 'react'

import PropTypes from 'prop-types'
import classnames from './InputTextArea.module.css'

/**
 The textarea component.
 @since 0.0.0
 @status REVIEWING
 @example
 <InputTextArea value={this.state.value} onChange={value=>this.setState({value})} />
 */
function InputTextArea({ className, noResize, value, onChange, ...props }) {
  return (
    <div className={classnames(className)}>
      <textarea
        {...props}
        value={value || ''}
        className={classnames('input', { 'no-resize': noResize })}
        onChange={event => onChange && onChange(event.target.value)}
      />
    </div>
  )
}

InputTextArea.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** Value */
  value: PropTypes.string,
  /**
   * Handler for change event
   * @function
   * @param {string} value
   */
  onChange: PropTypes.func,
  /** Disable Input */
  disabled: PropTypes.bool,
  /** Rows */
  rows: PropTypes.number,
  /** Disable resize and hide resize handle */
  noResize: PropTypes.bool,
  /** Placeholder */
  placeholder: PropTypes.string
}

InputTextArea.defaultProps = {
  disabled: false,
  noResize: false,
  rows: 1
}

export default InputTextArea
