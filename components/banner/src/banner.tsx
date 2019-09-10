import React from 'react'
import Icon, { IconName } from '@myntra/uikit-component-icon'
import Button from '@myntra/uikit-component-button'
import classnames from './banner.module.scss'

interface Props extends BaseProps {
  /**
   * The visual style to convey purpose of the alert.
   */
  type?: 'error' | 'warning' | 'success'
  /**
   *
   * _TIP:_ Set `icon` to `null` to remove icon.
   *
   * @since 1.6.0
   */
  icon?: IconName
  /**
   * @since 1.6.0
   */
  title?: string
  /**
   * The handler to call when the alert box is dismissed.
   */
  onClose?: () => void
  /**
   * The message/body of the alert box.
   */
  children: string | JSX.Element
}

const ICONS: Record<string, IconName> = {
  error: 'exclamation-triangle',
  warning: 'exclamation-circle',
  success: 'check-circle',
}

// Design: https://zpl.io/bA7ZRWp
// Documentation: https://zpl.io/bJGxg6E

/**
 * Informs users about important changes.
 * Use this component if you need to communicate to users in a prominent way.
 * Banners are placed at the top of the page or section they apply to, and below the page or section header.
 *
 * @since 1.6.0
 * @status READY
 * @category basic
 * @see https://uikit.myntra.com/components/alert
 */
export default function Banner({
  className,
  type,
  icon,
  title,
  solid,
  onClose,
  children,
  ...props
}: Props): JSX.Element {
  const typeName = (type as any) === 'primary' ? 'success' : type
  const heading = title || children
  const body = title ? children : null
  const iconName = icon === undefined ? ICONS[type] : icon

  return (
    <div
      {...props}
      className={classnames('container', typeName, className)}
      role="alert"
    >
      {iconName ? (
        <Icon className={classnames('icon', { top: !!body })} name={iconName} />
      ) : null}
      <div className={classnames('content')}>
        <div className={classnames('title')}>{heading}</div>
        {body ? <div className={classnames('body')}>{body}</div> : null}
      </div>
      {onClose && (
        <Button
          className={classnames('close')}
          type="link"
          icon="times"
          inheritTextColor
          onClick={onClose}
          data-test-id="close"
        />
      )}
    </div>
  )
}

Banner.defaultProps = {
  type: 'error',
}
