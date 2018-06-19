import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './InputDate.css'
import { classnames } from '@myntra/uikit-utils'

export default class Day extends PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    isEmpty: PropTypes.bool,
    isStart: PropTypes.bool,
    isEnd: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    onFocus: PropTypes.func
  }

  onFocus(event) {
    if (!this.props.isFocused && this.props.onFocus) {
      this.props.onFocus(event, this.props.isDisabled ? null : this.props.date)
    }
  }

  handleMouseDown = event => {
    if (!this.props.isEmpty && !this.props.isDisabled) {
      event.preventDefault()
      event.stopPropagation()

      this.props.onSelect(event, this.props.date)
    }
  }

  handleMouseEnter = event => {
    this.onFocus(event)
  }

  handleMouseMove = event => {
    this.onFocus(event)
  }

  handleTouchStart = () => {
    this.dragging = false
  }

  handleTouchMove = () => {
    this.dragging = true
  }

  handleTouchEnd = event => {
    if (this.dragging) return

    this.handleMouseDown(event)
  }

  render() {
    const { date, isDisabled, isSelected, isFocused, isStart, isEmpty, isEnd } = this.props
    const isToday = date && date.toDateString() === new Date().toDateString()

    return (
      <td
        className={classnames('gridDay', {
          gridDayDisabled: isDisabled,
          gridDayFocused: isFocused,
          gridDaySelected: isSelected,
          gridDaySelectedStart: isSelected && isStart,
          gridDaySelectedEnd: isSelected && isEnd,
          gridDayEmpty: isEmpty,
          gridToday: isToday
        }).use(styles)}
        title={date && date.toDateString()}
        onClick={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {!isEmpty && date ? date.getDate() : ''}
      </td>
    )
  }
}
