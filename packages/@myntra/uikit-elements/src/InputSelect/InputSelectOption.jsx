import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import { InputCheckBox } from '..'

import styles from './InputSelectOption.module.css'

export default class Option extends Component {
  static propTypes = {
    id: PropTypes.string,
    disabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    renderOption: PropTypes.func,
    labelKey: PropTypes.string,
    index: PropTypes.number.isRequired,
    hasCheckBox: PropTypes.bool
  }

  onFocus(event) {
    if (!this.props.isFocused) {
      this.props.onFocus(event, this.props.option, this.props.index)
    }
  }

  handleClick = event => {
    event.stopPropagation()
    this.props.onSelect(event, this.props.option, this.props.index)
  }

  handleMouseEnter = event => this.onFocus(event)

  handleMouseMove = event => this.onFocus(event)

  handleTouchStart = () => {
    this.dragging = false
  }

  handleTouchMove = () => {
    this.dragging = true
  }

  handleTouchEnd = event => {
    if (!this.dragging) {
      this.handleClick(event)
    }
  }

  render() {
    const { option, disabled, isSelected, isFocused, renderOption, labelKey, hasCheckBox } = this.props

    return (
      <div
        className={classnames('option', { focused: isFocused, selected: isSelected, disabled }).use(styles)}
        id={this.props.id}
        role="option"
        aria-selected={isSelected}
        aria-label={option[labelKey]}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        title={option[labelKey]}
      >
        {hasCheckBox && <InputCheckBox className={classnames('checkbox').use(styles)} value={isSelected} />}
        {renderOption ? renderOption(option) : option[labelKey]}
      </div>
    )
  }
}
