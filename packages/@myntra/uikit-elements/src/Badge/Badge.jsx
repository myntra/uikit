import React from 'react'
import classnames from './Badge.module.css'
import PropTypes from 'prop-types'

/**
 Badge component
 @since 0.8.0
 @status REVIEWING
 @example
<Badge>Earth Badge</Badge>
 */
export default function Badge({ type, children }) {
  return (
    <div className={classnames('badge', type)}>
      {typeof children === 'string' ? <span className={classnames('content')}>{children}</span> : children}
    </div>
  )
}

Badge.propTypes = {
  /** Type of the badge */
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  /** Badge content */
  children: PropTypes.any.isRequired
}

Badge.defaultProps = {
  type: 'success'
}
