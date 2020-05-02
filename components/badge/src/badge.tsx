import React from 'react'

import classnames from './badge.module.scss'

interface Props extends BaseProps {
  /** The visual style to convey purpose of the badge. */
  type?: 'primary' | 'success' | 'warning' | 'error' | 'incomplete'
  /** The label text of the badge. */
  children: string
}

/**
 * Displays an information pill/badge.
 *
 * @since 0.8.0
 * @status REVIEWING
 * @category basic
 */
export default function Badge({
  type,
  children,
  className,
  ...props
}: Props): JSX.Element {
  return (
    <div {...props} className={classnames('badge', type, className)}>
      {typeof children === 'string' ? (
        <span className={classnames('content')}>{children}</span>
      ) : (
        children
      )}
    </div>
  )
}

Badge.defaultProps = {
  type: 'primary',
}
