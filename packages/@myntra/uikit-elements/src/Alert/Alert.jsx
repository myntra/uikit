import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'
import styles from './Alert.module.css'
import { Icon } from '../index.js'

const ICONS = {
  error: 'exclamation-triangle',
  warning: 'exclamation-triangle',
  success: 'check-circle',
  info: 'info-circle'
}

/**
 The Alert component.
 @since 0.3.0
 @status EXPERIMENTAL
 @example
<Alert onClose={() => null}>An alert message.</Alert>
 */
function Alert({ className, type, noFill, onClose, children }) {
  return (
    <div className={classnames('alert', { 'no-fill': noFill }, type, className).use(styles)}>
      <Icon className={classnames('icon', 'legend').use(styles)} name={ICONS[type]} />
      <div className={classnames('content').use(styles)}>{children}</div>
      {onClose && (
        <div className={classnames('close').use(styles)} onClick={onClose} role="button">
          <Icon name="times" className={classnames('icon').use(styles)} />
        </div>
      )}
    </div>
  )
}

Alert.propTypes = {
  /** @private */
  className: PropTypes.string,
  /**
   * Handler for change event
   * @function
   */
  onClose: PropTypes.func,
  /** Only border based Alert */
  noFill: PropTypes.bool,
  /** Type of Alert  */
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  /** Children */
  children: PropTypes.any.isRequired
}

Alert.defaultProps = {
  noFill: false,
  type: 'error'
}

export default Alert
