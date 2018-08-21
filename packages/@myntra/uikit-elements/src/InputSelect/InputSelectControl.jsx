import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import { toString } from './helpers'
import styles from './InputSelectControl.module.css'

export default class InputSelectControl extends PureComponent {
  static propTypes = {
    multiple: PropTypes.bool,
    value: PropTypes.string,
    slotValue: PropTypes.node,
    isOpen: PropTypes.bool,
    instancePrefix: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    children: PropTypes.any
  }

  handleChange = event => this.props.onChange(event.target.value)
  handleClick = event => event.stopPropagation()
  delayedBlur = () => !this.props.multiple && this.props.onBlur && setTimeout(this.props.onBlur, 16) // 1 frame at 60 fps

  render() {
    const { isOpen, instancePrefix, slotValue, children, onClick, onChange, onBlur, ...props } = this.props

    return (
      <div className={classnames('control').use(styles)} onClick={onClick}>
        {slotValue}
        <input
          {...props}
          onBlur={this.delayedBlur}
          onChange={this.handleChange}
          className={classnames('input').use(styles)}
          role="combobox"
          autoComplete="off"
          aria-haspopup={toString(isOpen)}
          aria-expanded={toString(isOpen)}
          aria-autocomplete="both"
          aria-controls={`${instancePrefix}-options`}
          aria-owns={`${instancePrefix}-options`}
        />
        <div className={classnames('buttons').use(styles)}>{children}</div>
      </div>
    )
  }
}
