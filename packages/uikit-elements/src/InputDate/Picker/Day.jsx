import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import classnames from './Day.module.css'
import { UTCDate } from '../InputDateUtils'

/**
 * @since 0.0.0
 * @status REVIEWING
 * @example
 * <InputDatePicker.Day year={2018} month={0} day={1} />
 */
export default class Day extends PureComponent {
  static propTypes = {
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    isSelectionStart: PropTypes.bool,
    isSelectionEnd: PropTypes.bool,
    /**
     * @function
     * @param {Date} value
     */
    onSelect: PropTypes.func,
    /**
     * @function
     * @param {Date} value
     */
    onFocus: PropTypes.func,
    /** @private */
    isValidDate(props) {
      const names = ['year', 'month', 'day']

      if (names.every(name => typeof props[name] === 'number')) {
        if (Number.isNaN(UTCDate(props.year, props.month, props.day).getTime())) {
          throw new Error(`Invalid date`)
        }
      }
    }
  }

  get isEmpty() {
    return Number.isNaN(this.date.getTime())
  }

  get date() {
    return UTCDate(this.props.year, this.props.month, this.props.day)
  }

  handleFocus = event => {
    if (this.props.onFocus) {
      if (this.isEmpty || this.props.disabled) {
        this.props.onFocus(null)
      } else if (!this.props.focused) this.props.onFocus(this.date)
    }
  }

  handleBlur = event => {
    if (this.props.onFocus && this.props.focused) {
      this.props.onFocus(null)
    }
  }

  handleMouseDown = event => {
    if (this.props.disabled) {
      event.stopPropagation()
    } else if (this.props.onSelect && !this.isEmpty) {
      this.props.onSelect(this.date)
    }
  }

  handleMouseEnter = event => this.handleFocus(event)
  handleMouseLeave = event => this.handleBlur(event)

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
    const { date, isEmpty } = this
    const { disabled, focused, selected, isSelectionEnd, isSelectionStart } = this.props
    const isToday = !isEmpty && date.toDateString() === new Date().toDateString()

    return (
      <div
        className={classnames('day', {
          focused,
          selected,
          start: selected && isSelectionStart,
          end: selected && isSelectionEnd,
          empty: isEmpty,
          today: isToday
        })}
        aria-hidden={isEmpty}
        disabled={disabled}
        title={isEmpty ? null : this.date.toDateString()}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {isEmpty ? 0 : date.getUTCDate()}
      </div>
    )
  }
}
