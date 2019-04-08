import React from 'react'

import classnames from './top-bar-item.module.scss'
import Icon, { IconName } from '@myntra/uikit-component-icon'

interface TopBarItemProps extends BaseProps {
  /**
   * Adds icon.
   */
  icon?: IconName
  /**
   * Description of icon.
   */
  altText?: string
  /**
   * Breadcrumb text or link.
   */
  children: JSX.Element
}

/**
 * A component for page header
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/top-bar#TopBarItem
 */
export default function TopBarItem({
  icon,
  altText,
  className,
  children,
  ...props
}: TopBarItemProps) {
  return (
    <div {...props} className={classnames('item', className)}>
      {icon ? (
        <Icon name={icon} title={altText} className={classnames('icon')} />
      ) : null}
      {children}
    </div>
  )
}
