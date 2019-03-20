import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../index.js'
import classnames from './Button.module.css'

/**
 The button/link component.

 @since 0.0.0
 @status READY
 @example
 <Button>Click Me</Button>
 */
export default class Button extends PureComponent {
  static RouterLink = props => (
    <a href={props.to} {...props}>
      {props.children}
    </a>
  )

  static propTypes = {
    /**
     * Link for `href` attribute.
     *
     * Button uses `<a>` tag.
     */
    href: PropTypes.string,
    /**
     * Link as expected by Button.RouterLink component.
     *
     * Button uses `<RouterLink>` component.
     */
    to: PropTypes.any,
    /** Text displayed on the button. */
    label: PropTypes.string,
    /**
     * Text displayed on the button.
     *
     * `children` prop if set, overrides `label`.
     */
    children: PropTypes.any,
    /**
     * Icon is displayed at the start of the button.
     */
    icon: PropTypes.string,
    /** Addition icon displayed at the end of the button.  */
    secondaryIcon: PropTypes.string,
    /** Type of button. */
    type: PropTypes.oneOf([
      'primary',
      'secondary',
      'link',
      /** @deprecated */
      'link.inherit'
    ]),
    /** HTML type attribute for <button>. */
    htmlType: PropTypes.string,
    /** Disables button element */
    disabled: PropTypes.bool,
    /**
     * Displays loading state.
     *
     * @since 0.6.0
     */
    isLoading: PropTypes.bool,
    /** Use current text color */
    inheritTextColor: PropTypes.bool,
    /**
     * Click event handler
     *
     * @type {{(event: MouseEvent): void}}
     */
    onClick: PropTypes.func,
    className: PropTypes.string,
    __validate__: props => {
      if ('href' in props && 'to' in props) {
        throw new Error('`to` and `href` cannot be used together')
      }

      if (props.type === 'link.inherit') {
        // TODO(v0.7.0): Remove type="link.inherit"
        console.warn(
          'Button type `"link.inherit"` is deprecated and would be removed in v0.7.0. Use `<Button type="link" inheritTextColor />`.'
        )
      }
    }
  }

  static defaultProps = {
    type: 'primary',
    disabled: false,
    isLoading: false,
    inheritTextColor: false
  }

  handleClick = event => {
    if (this.props.disabled) {
      return event.preventDefault()
    }

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
      label,
      disabled,
      inheritTextColor,
      isLoading,
      children,
      ...forwardedProps
    } = this.props
    const Tag = to ? Button.RouterLink : href ? 'a' : 'button'
    const needLeftSlot = !!icon
    const needRightSlot = !!secondaryIcon

    return (
      <Tag
        tabIndex="0" // enable tab navigation.
        {...forwardedProps}
        type={htmlType}
        className={classnames(
          'button',
          className,
          /* Button Styles */
          {
            [type]: true,
            loading: isLoading
          },
          inheritTextColor && 'inherit'
        )}
        to={to}
        href={href}
        disabled={disabled}
        role="button"
        onClick={this.handleClick}
        data-test-id="target"
      >
        {needLeftSlot && (
          <span className={classnames('left')} data-test-id="primary-icon">
            <Icon name={icon} aria-hidden="true" />
          </span>
        )}
        {children || label}
        {needRightSlot && (
          <span className={classnames('right')} data-test-id="secondary-icon">
            <Icon name={secondaryIcon} aria-hidden="true" />
          </span>
        )}
      </Tag>
    )
  }
}
