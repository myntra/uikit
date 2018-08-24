import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import styles from './FormHelpText.module.css'

/**
 * Help text for form fields.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @example
 * <Form.Help type="error">An error message.</Form.Help>
 */
function FormHelp({ children, type }) {
  return <div className={classnames('helptext', { [`helptext-${type}`]: type }).use(styles)}>{children}</div>
}

FormHelp.propTypes = {
  /** Contents of message */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** Type of message */
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info'])
}

export default FormHelp
