import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { toString } from './helpers'
import classnames from './InputSelectControl.module.css'

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
  delayedBlur = () => !this.props.multiple && this.props.onBlur && setTimeout(this.props.onBlur, 200)

  render() {
    const { isOpen, instancePrefix, slotValue, children, onClick, onChange, onBlur, ...props } = this.props

    return (
      <div className={classnames('control')} onClick={onClick}>
        {props.value ? null : slotValue}
        <input
          {...props}
          onBlur={this.delayedBlur}
          onChange={this.handleChange}
          className={classnames('input')}
          role="combobox"
          autoComplete="off"
          aria-haspopup={toString(isOpen)}
          aria-expanded={toString(isOpen)}
          aria-autocomplete="both"
          aria-controls={`${instancePrefix}-options`}
          aria-owns={`${instancePrefix}-options`}
        />
        <div className={classnames('buttons')}>{children}</div>
      </div>
    )
  }
}
