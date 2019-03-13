import React from 'react'
import Icon, { IconName } from '@myntra/uikit-component-icon'
import Button from '@myntra/uikit-component-button'
import classnames from './alert.module.scss'


interface AlertProps extends BaseProps {
  /**
   * The visual style to convey purpose of the alert.
   * ```jsx
   * <Alert type="error">message here</Alert>
   * ```
   */
  type: 'primary' | 'error' | 'warning' | 'success'
  /**
   * The handler to call when the alert box is dismissed.
   */
  onClose?: () => void
  /**
   * Displays a alert box with filled background.
   */
  solid?: boolean
  /**
   * The message/body of the alert box.
   */
  children: string | JSX.Element
}

const ICONS = {
  error: 'exclamation-triangle',
  warning: 'exclamation-triangle',
  success: 'check-circle',
  primary: 'info-circle'
} as Record<string, IconName>

/**
 * Show a message intended to draw the user's attention.
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 */
export default function Alert({ className, type, solid, onClose, children }: AlertProps): JSX.Element {
  return (
    <div className={classnames('alert', { solid }, type, className)}>
      <Icon name={ICONS[type]} />
      <div className={classnames('content')}>{children}</div>
      {onClose && (
        <Button className={classnames('close')} type="link" icon="times" inheritTextColor onClick={onClose} data-test-id="close" />
      )}
    </div>
  )
}

Alert.defaultProps = {
  noFill: false,
  onClose: null,
  type: 'error'
}
