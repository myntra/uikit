import React, { PureComponent } from 'react'
import Icon, { IconName } from '@myntra/uikit-component-icon'
import Button from '@myntra/uikit-component-button'
import classnames from './alert.module.scss'
import { ICONS, RE_BACKWARD_COMPAT } from './constants'

export interface Props extends BaseProps {
  /**
   * The visual style to convey purpose of the alert.
   */
  type?: 'error' | 'warning' | 'success'
  /**
   *
   * _TIP:_ Set `icon` to `null` to remove icon.
   *
   */
  icon?: IconName
  /**
   * Title for the alert box
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
  /** 
   * Only border based Alert 
   */
  noFill: boolean
}

/**
 * Informs users about important changes.
 * Use this component if you need to communicate to users in a prominent way.
 * Alerts are placed at the top of the page or section they apply to, and below the page or section header.
 *
 * @since 1.0.0
 * @status READY
 * @category basic
 * @see https://uikit.myntra.com/components/alert
 */

export default class Alert extends PureComponent<Props> {
  static defaultProps = {
    type: 'error',
  }

  render() {
    const {
      className,
      type,
      icon,
      title,
      solid,
      onClose,
      noFill,
      children,
      ...props
    } = this.props

    const typeName = RE_BACKWARD_COMPAT.test(type) ? 'success' : type
    const heading = title || children
    const body = title ? children : null
    const iconName = icon === undefined ? ICONS[type] : icon

    return (
      <div
        {...props}
        className={classnames('container', typeName, className, {
          'no-fill': noFill
        })}
        role="alert"
      >
        {iconName ? (
          <Icon
            className={classnames('icon', { top: !!body })}
            name={iconName}
          />
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
}
