import React, { PureComponent, useContext, ReactNode } from 'react'
import Icon, { IconName } from '@myntra/uikit-component-icon'
import classnames from './button.module.scss'
import { CAN_USE_HOOKS } from '@myntra/uikit-can-i-use'

import Link from './link'
import HookLink from './link-hook'
import RouterLink from './router-link'
import HookRouterLink from './router-link-hook'

export interface Props extends BaseProps {
  /** The visual style to convey purpose of the button. */
  type?: 'primary' | 'secondary' | 'link' | 'text'
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

  static propsTypes = {
    __$validation({ to, href }) {
      if (to && href)
        throw new Error(`The props 'to' and 'href' cannot coexist.`)
    },
    label() {
      throw new Error(`The 'label' prop is deprecated. Use 'children' instead.`)
    },
  }

  static defaultProps = {
    type: 'secondary',
    disabled: false,
    inheritTextColor: false,
    loading: false,
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
      ...props
    } = this.props
    const Tag = (to ? Button.RouterLink : href ? Button.Link : 'button') as any
    const isIconButton = !(children || label)
    const needLeftSlot = !!icon || isIconButton
    const needRightSlot = !!secondaryIcon && !isIconButton
    const typeName = type === 'link' ? 'text' : type

    return (
      <Tag
        tabIndex={0} // enable tab navigation.
        {...props}
        type={htmlType}
        className={classnames('container', className, typeName, state, {
          loading,
          inherit: inheritTextColor,
          icon: isIconButton,
        })}
        to={to}
        href={href}
        disabled={disabled}
        role="button"
        onClick={this.handleClick}
        data-test-id="target"
      >
        {needLeftSlot && (
          <span
            className={classnames('icon', { leading: !isIconButton })}
            data-test-id="primary-icon"
          >
            <Icon name={icon || 'question'} aria-hidden="true" />
          </span>
        )}
        {isIconButton ? null : <span>{children || label}</span>}
        {needRightSlot && (
          <span
            className={classnames('icon', 'trailing')}
            data-test-id="secondary-icon"
          >
            <Icon name={secondaryIcon} aria-hidden="true" />
          </span>
        )}

        {loading && (
          <div className={classnames('icon', 'loading')}>
            <Icon name="circle-notch" spin />
          </div>
        )}
      </Tag>
    )
  }
}
