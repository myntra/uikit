import React, { PureComponent } from 'react'
import Icon, { IconName } from '@myntra/uikit-component-icon'
import classnames from './button.module.scss'

interface ButtonProps extends BaseProps {
  /** The visual style to convey purpose of the button. */
  type: 'primary' | 'secondary' | 'link'
  /** The label text of the button. */
  children: string
  /** The handler to call when the button is clicked. */
  onClick?(event: MouseEvent): void
  /** The name of the icon (displayed on left side of content). */
  icon?: IconName
  /** The name of the icon (displayed on right side of content). */
  secondaryIcon?: IconName
  /** Disables the button (changes visual style and ignores button interactions). */
  disabled: boolean
  /** Changes visual style to show progress. */
  loading: boolean
  /** Uses current text color (useful for link buttons). */
  inheritTextColor: boolean
  /** The 'type' attribute for the button element (as 'type' is used for defining visual type) */
  htmlType?: 'submit' | 'reset' | 'button'
  /** The URL to navigate to when the button is clicked (uses client side router). */
  to?: string | object
  /** The URL to navigate to when the button is clicked (uses browser anchor tag). */
  href?: string
}


/**
 * Buttons provide click-able actions.
 *
 * @since 0.0.0
 * @status READY
 * @category basic
 */
export default class Button extends PureComponent<ButtonProps> {
  static RouterLink = props => (
    <a href={props.to} {...props}>
      {props.children}
    </a>
  )

  static defaultProps = {
    type: 'secondary',
    disabled: false,
    loading: false,
    inheritTextColor: false
  }

  state = {
    active: false
  }

  handleClick = event => {
    if (this.props.disabled) {
      return event.preventDefault()
    }

    this.setState({ active: true })

    setTimeout(() => this.setState({ active: false }), 100)

    if (this.props.onClick) {
      return this.props.onClick(event)
    }
  }

  render() {
    const {
      icon,
      secondaryIcon,
      htmlType,
      className,
      type,
      to,
      href,
      disabled,
      inheritTextColor,
      loading,
      children,
      ...props
    } = this.props
    const Tag = to ? Button.RouterLink : href ? 'a' : 'button'
    const isIconButton = !children
    const needLeftSlot = !!icon || isIconButton
    const needRightSlot = !!secondaryIcon && !isIconButton

    return (
      <Tag
        tabIndex="0" // enable tab navigation.
        {...props}
        type={htmlType}
        className={classnames(
          'button',
          className,
          type,
          { loading, inherit: inheritTextColor, active: this.state.active, 'has-icon': isIconButton },
        )}
        to={to}
        href={href}
        disabled={disabled}
        role="button"
        onClick={this.handleClick}
        data-test-id="target"
      >
        {needLeftSlot && (
          <div className={classnames(isIconButton ? 'icon' : 'primary-icon')} data-test-id="primary-icon">
            <Icon name={icon || 'question'} aria-hidden="true" />
          </div>
        )}
        {children}
        {needRightSlot && (
          <div className={classnames('secondary-icon')} data-test-id="secondary-icon">
            <Icon name={secondaryIcon} aria-hidden="true" />
          </div>
        )}
      </Tag>
    )
  }
}
