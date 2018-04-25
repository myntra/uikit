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
    disabled: PropTypes.bool
  }

  static defaultProps = {
    type: 'primary',
    disabled: false
  }

  handleClick = event => {
    if (this.props.disabled) {
      event.preventDefault()
      event.stopPropagation()

      return
    }

    return false
  }

  render() {
    const Tag = this.props.to ? Button.RouterLink : this.props.href ? 'a' : 'button'
    const needLeftSlot = !!this.props.icon
    const needRightSlot = !!this.props.secondaryIcon

    return (
      <Tag
        className={classnames('button', {
          /* Button Styles */
          primary: this.props.type === 'primary',
          secondary: this.props.type === 'secondary',
          accent: false,
          success: false,
          danger: false,
          warning: false,
          info: false,
          /* Button States */
          loading: false
        }).use(styles)}
        href={this.props.href}
        to={this.props.to}
        role="button"
        disabled={this.props.disabled}
        onClick={this.handleClick}
      >
        {needLeftSlot && (
          <div className={classnames('left').use(styles)}>
            <Icon name={this.props.icon} />
          </div>
        )}
        {this.props.children || this.props.label}
        {needRightSlot && (
          <div className={classnames('right').use(styles)}>
            <Icon name={this.props.secondaryIcon} />
          </div>
        )}
      </Tag>
    )
  }
}
