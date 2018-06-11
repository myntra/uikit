import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'
import styles from './InputText.css'

/**
 The InputText component.
 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <InputText />
 */
const InputText = ({ disabled, className, ...props }) => {
  return (
    <div className={className}>
      <input {...props} className={classnames('input').use(styles)} disabled={disabled} type="text" />
    </div>
  )
}

InputText.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** Disable Input */
  disabled: PropTypes.bool
}

InputText.defaultProps = {
  disabled: false
}

export default InputText
