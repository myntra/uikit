import React, { PureComponent, ReactNode } from 'react'
import Icon, { IconName } from '@applique-ui/icon'
import Text from '@applique-ui/text'
import Loader from '@applique-ui/loader'
import { CAN_USE_HOOKS } from '@applique-ui/uikit-can-i-use'
import { buttonVariants, cn } from '@applique-ui/shadcn-primitives'

// Inner-element styles (icon slots, loading spinner, count badge, etc.)
// Container-level styling is handled by Tailwind via buttonVariants above.
import scss from './button.module.scss'

import Link from './link'
import HookLink from './link-hook'
import RouterLink from './router-link'
import HookRouterLink from './router-link-hook'

import Bell from 'uikit-icons/svgs/Bell'

export interface Props extends BaseProps {
  /** The visual style to convey purpose of the button. */
  type?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'text'
  /** Will show the button as a notification button with the number of notifications. (provided)*/
  notifications?: number
  /** The label text of the button. */
  children?: string | ReactNode
  /** The handler to call when the button is clicked. */
  onClick?(event: MouseEvent): void
  /** The name of the icon (displayed on left side of content). */
  icon?: IconName
  /** The name of the icon (displayed on right side of content). */
  secondaryIcon?: IconName
  /** Disables the button (changes visual style and ignores button interactions). */
  disabled?: boolean
  /** Changes visual style to show progress. */
  loading?: boolean
  /** Uses current text color (useful for link buttons). */
  inheritTextColor?: boolean
  /** The 'type' attribute for the button element (as 'type' is used for defining visual type) */
  htmlType?: 'submit' | 'reset' | 'button'
  /** The URL to navigate to when the button is clicked (uses client side router). */
  to?: string | object
  /** The URL to navigate to when the button is clicked (uses browser anchor tag). */
  href?: string
  /** The transform attribute to transform button label. */
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  /**
   * Size of the button
   */
  size?: 'xs' | 'small' | 'regular' | 'large'
  /**
   * Backgroud color for button
   */
  color?: string
  /** This will be used for large buttons */
  caption?: string
}

/**
 * Buttons are clickable items used to perform an action. Use buttons to trigger actions and links. Buttons can contain a combination of a clear label and an icon while links are always text.
 *
 * @since 0.0.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/button
 */
export default class Button extends PureComponent<Props> {
  static RouterLink = CAN_USE_HOOKS ? HookRouterLink : RouterLink
  static Link = CAN_USE_HOOKS ? HookLink : Link

  static propTypes = {
    __$validation({ to, href, size, icon, children, label }) {
      if (to && href) {
        throw new Error(`The props 'to' and 'href' cannot coexist.`)
      }

      if (size === 'xs') {
        if (!icon) {
          throw new Error(
            `The prop 'icon' is required when size is set to 'xs'.`
          )
        } else if (children || label) {
          throw new Error(
            `The props 'children' and 'label' cannot be used when size is set to 'xs'.`
          )
        }
      }
    },
  }

  static defaultProps = {
    type: 'secondary',
    disabled: false,
    inheritTextColor: false,
    loading: false,
    transform: 'none',
    size: 'regular',
    color: 'blue',
  }

  state = {
    active: false,
  }

  clickCoolDown: number

  componentWillUnmount() {
    window.clearTimeout(this.clickCoolDown)
  }

  handleClick = (event) => {
    if (this.props.disabled || this.state.active || this.props.loading) {
      return event.preventDefault()
    }

    // show button press animation.
    this.setState({ active: true })
    this.clickCoolDown = window.setTimeout(
      () => this.setState({ active: false }),
      100
    )

    if (this.props.onClick) {
      return this.props.onClick(event)
    }
  }

  render() {
    const {
      icon,
      secondaryIcon,
      htmlType = 'button',
      className,
      type,
      to,
      state,
      href,
      disabled,
      inheritTextColor,
      loading,
      children,
      label,
      notifications,
      transform,
      size,
      color,
      caption,
      ...props
    } = this.props
    const Tag = (to ? Button.RouterLink : href ? Button.Link : 'button') as any
    const isNotificationButton = typeof notifications == 'number'
    const notificationsActive = isNotificationButton && notifications > 0
    const isIconButton = !(children || label) || isNotificationButton
    const needLeftSlot = !!icon || isIconButton
    const needRightSlot = !!secondaryIcon && !isIconButton

    // Applique `type='link'` is visually identical to `type='text'`.
    // Notification buttons are always rendered as primary.
    const intent = (
      type === 'link' ? 'text' : notificationsActive ? 'primary' : type
    ) as 'primary' | 'secondary' | 'tertiary' | 'text'

    const tone = (color || 'blue') as
      | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'pink'

    return (
      <Tag
        tabIndex={0} // enable tab navigation.
        {...props}
        type={type !== 'text' ? htmlType : ''}
        className={cn(
          // Tailwind-based container styling via shadcn primitive variants
          buttonVariants({
            intent,
            tone,
            size: size as any,
            iconButton: isIconButton,
            notification: isNotificationButton,
          }),
          // SCSS-module modifier for "inherit text colour from parent"
          inheritTextColor && scss('inherit'),
          // SCSS-module modifier that hides child content when spinner is shown
          loading && scss('loading-container'),
          // Any extra state class passed by the consumer
          state as string,
          // Consumer className always wins (twMerge handles conflicts)
          className
        )}
        to={to}
        href={href}
        disabled={disabled || loading}
        role="button"
        onClick={this.handleClick}
        data-test-id="target"
        style={{
          textTransform: transform,
        }}
      >
        {needLeftSlot && (
          <span
            className={cn(
              scss('icon'),
              isIconButton ? scss('icon-button') : scss('leading'),
              notificationsActive && scss('notification-icon')
            )}
            data-test-id="primary-icon"
          >
            {notificationsActive && (
              <span
                className={scss('count')}
                title={notifications.toString()}
              >
                {notifications > 99 ? '99+' : notifications}
              </span>
            )}
            <Icon name={icon || Bell} aria-hidden="true" />
          </span>
        )}
        {isIconButton ? null : children || label}
        {needRightSlot && (
          <span className={cn(scss('icon'), scss('trailing'))} data-test-id="secondary-icon">
            <Icon
              name={secondaryIcon}
              aria-hidden="true"
            />
          </span>
        )}

        {loading && (
          <Loader
            className={scss('loading')}
            type="inline"
            appearance="spinner"
          />
        )}
        {size === 'large' && (
          <Text.caption className={scss('caption')}>
            {caption}
          </Text.caption>
        )}
      </Tag>
    )
  }
}
