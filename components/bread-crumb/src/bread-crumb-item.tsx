import React from 'react'
import classnames from './bread-crumb.module.scss'

export interface BreadCrumbItem extends BaseProps {}

/**
 * A breadcrumb item
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/bread-crum#BreadCrumbIcon
 */
export default function BreadCrumbItem({ className, children, ...props }) {
  return (
    <li className={classnames('page')} {...props}>
      {children}
    </li>
  )
}
