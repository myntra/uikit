import React from 'react'
import classnames from './group.module.scss'

export interface GroupProps extends BaseProps {}

/**
 * A group component to combine multiple group-able components.
 *
 * @since 0.11.0
 * @status EXPERIMENTAL
 * @category composition
 * @see http://uikit.myntra.com/components/group
 */
export default function Group({ className, children }: GroupProps) {
  return <div className={classnames('container', className)}>{children}</div>
}
