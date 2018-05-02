import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import Icon from './Icon'
import styles from './Button.css'

/**
 The button/link component.

 @since 0.0.0
 @status EXPERIMENTAL
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
    /** Hyperlink */
    href: PropTypes.string,
    /** ReactRouter Link or ReduxRouter Link */
    to: PropTypes.any,
    /** Label Text */
    label: PropTypes.string,
    /** Child Nodes */
    children: PropTypes.any,
    /** Primary Icon */
    icon: PropTypes.string,
    /** Secondary Icon */
    secondaryIcon: PropTypes.string,
    /** Type */
    type: PropTypes.oneOf(['primary', 'secondary']),
    /** Disabled */
    disabled: PropTypes.bool,
    /** Click event handler */
    onClick: PropTypes.func
  }

  static defaultProps = {
    type: 'primary',
    disabled: false
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
    const { href, to, label, children, icon, secondaryIcon, type, disabled, ...props } = this.props
    const Tag = this.props.to ? Button.RouterLink : href ? 'a' : 'button'
    const needLeftSlot = !!icon
    const needRightSlot = !!secondaryIcon

    return (
      <Tag
        {...props}
        className={classnames('button', {
          /* Button Styles */
          primary: type === 'primary',
          secondary: type === 'secondary',
          /* Button States */
          loading: false
        }).use(styles)}
        href={href}
        to={to}
        role="button"
        disabled={disabled}
        onClick={this.handleClick}
      >
        {needLeftSlot && (
          <div className={classnames('left').use(styles)}>
            <Icon name={icon} />
          </div>
        )}
        {children || label}
        {needRightSlot && (
          <div className={classnames('right').use(styles)}>
            <Icon name={secondaryIcon} />
          </div>
        )}
      </Tag>
    )
  }
}
