import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames, onlyExtraProps } from '@myntra/uikit-utils'

import Icon from '../Icon/Icon'
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

  get forwardedProps() {
    this._forwardedProps = this._forwardedProps || onlyExtraProps(Button.propTypes)

    return this._forwardedProps(this.props)
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
    const { icon, secondaryIcon } = this.props
    const Tag = this.props.to ? Button.RouterLink : this.props.href ? 'a' : 'button'
    const needLeftSlot = !!icon
    const needRightSlot = !!secondaryIcon

    return (
      <Tag
        {...this.forwardedProps}
        className={classnames(
          'button',
          /* Button Styles */
          { [this.props.type]: true },
          /* Button States */
          {
            loading: false
          }
        ).use(styles)}
        href={this.props.href}
        to={this.props.to}
        role="button"
        disabled={this.props.disabled}
        onClick={this.handleClick}
      >
        {needLeftSlot && (
          <div className={classnames('left').use(styles)}>
            <Icon name={icon} />
          </div>
        )}
        {this.props.children || this.props.label}
        {needRightSlot && (
          <div className={classnames('right').use(styles)}>
            <Icon name={secondaryIcon} />
          </div>
        )}
      </Tag>
    )
  }
}
