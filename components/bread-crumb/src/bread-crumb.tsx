import React from 'react'
import classnames from './bread-crumb.module.scss'
import BreadCrumbItem from './bread-crumb-item'

export interface BreadCrumbProps extends BaseProps {}

/**
 * The BreadCrumb component.
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/bread-crumb
 */
export default function BreadCrumb({
  className,
  children,
  ...props
}: BreadCrumbProps) {
  return (
    <nav {...props} className={classnames(className, 'pages')}>
      <ol>{children}</ol>
    </nav>
  )
}

BreadCrumb.Item = BreadCrumbItem
