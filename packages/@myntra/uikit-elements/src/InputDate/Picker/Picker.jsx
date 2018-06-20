import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Month from './Month'
import Jumper from './Jumper'

import styles from './Picker.css'
import { classnames } from '@myntra/uikit-utils'
import { lastDayOfMonth } from 'date-fns'
import { UTCDate } from '../InputDateUtils'

/**
 * Create range.
 * @param {number} n
 * @returns {number[]}
 */
function range(n) {
  return Array.apply(null, { length: n }).map((_, i) => i)
}

/**
 {describe component}

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <InputDatePicker.Picker />
 */
export default class Picker extends Component {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    /** @private */
    children: PropTypes.any,
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.shape({ from: PropTypes.instanceOf(Date), to: PropTypes.instanceOf(Date) })
    ]),
    onChange: PropTypes.func,
    monthsToDisplay: PropTypes.number,
    disabledDates: PropTypes.arrayOf(
      PropTypes.shape({ from: PropTypes.instanceOf(Date), to: PropTypes.instanceOf(Date) })
    ),
    disabled: PropTypes.bool,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    range: PropTypes.bool,
    /** @private */
    _validate(props) {
      if (props.range && props.value instanceof Date) {
        throw new Error('When using `range` prop, value should be a plain object of type ({ from?: Date, to?: Date }).')
      }
    },
    openToDate: PropTypes.instanceOf(Date),
    /**
     * @function
     * @param {Date} date
     */
    onOpenToDateChange: PropTypes.func,
    onRangeStartSelected: PropTypes.func,
    onRangeEndSelected: PropTypes.func,
    active: PropTypes.oneOf(['from', 'to'])
  }

  static defaultProps = {
    monthsToDisplay: 1,
    range: false
  }

  state = {
    focused: null,
    openToDate: null
  }

  handleJump = openToDate => {
    this.setState({ openToDate })
    if (this.props.onOpenToDateChange) this.props.onOpenToDateChange(openToDate)
  }

  componentWillUnmount() {
    clearTimeout(this.focusClearTimer)
  }

  handleDateFocus = (_, focused) => {
    clearTimeout(this.focusClearTimer)
    if (!this.props.disabled) {
      if (this.props.range && !focused) {
        // Delay blurring when selecting second end in range.
        if (this.props.value && !(this.props.value.from && this.props.value.to)) {
          this.focusClearTimer = setTimeout(() => {
            try {
              this.setState({ focused })
            } catch (e) {
              // may be component is unmounted.
            }
          }, 1000)
          return
        }
      }

      this.setState({ focused })
    }
  }

  handleDateSelect = (_, value) => {
    if (this.props.disabled || !this.props.onChange) return
    if (!this.props.range) return this.props.onChange(value)
    if (this.props.active) return this.fireRangeEvent({ ...this.props.value, [this.props.active]: value })
    if (!this.props.value) return this.fireRangeEvent({ from: value })
    if (this.props.value.from && !this.props.value.to)
      return this.fireRangeEvent({ from: this.props.value.from, to: value })
    if (!this.props.value.from && this.props.value.to)
      return this.fireRangeEvent({ from: value, to: this.props.value.to })
    return this.fireRangeEvent({ from: value })
  }

  fireRangeEvent(value) {
    if (this.props.onRangeStartSelected && value.from) this.props.onRangeStartSelected(value.from)
    if (this.props.onRangeEndSelected && value.to) this.props.onRangeEndSelected(value.to)
    if (this.props.onChange) {
      if (value.from && value.to) {
        const [from, to] = [value.from, value.to].sort((a, b) => a.getTime() - b.getTime())
        value = { from, to }
      }

      this.props.onChange(value)
    }
  }

  /**
   * @type {Date}
   */
  get referenceDate() {
    return this.props.openToDate || this.state.openToDate || new Date()
  }

  isSameMonth(a, b) {
    return (
      a instanceof Date && b instanceof Date && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
    )
  }

  findSelectionRange(value, date) {
    if (!value.from || !value.to) return null
    // re-order if required.
    value = value.from.getTime() <= value.to.getTime() ? value : { from: value.to, to: value.from }

    let from, to
    const isFrom = this.isSameMonth(value.from, date)
    const isTo = this.isSameMonth(value.to, date)
    const first = UTCDate(date.getFullYear(), date.getMonth(), 1)

    if (isFrom) from = value.from.getDate()
    else if (value.from.getTime() < first.getTime()) from = 0
    else return null

    const last = lastDayOfMonth(first)
    if (isTo) to = value.to.getDate()
    else if (value.to.getTime() > last.getTime()) to = last.getDate() + 1
    else return null

    return { from, to }
  }

  createSelectionData(date) {
    const value = this.props.value
    const focused = this.state.focused
    const selecting = this.props.active
    if (!this.props.range) {
      if (this.isSameMonth(value, date)) {
        return { from: value.getDate(), to: value.getDate() }
      }
    } else if (value) {
      const hasFrom = !!value.from
      const hasTo = !!value.to
      const hasFocused = !!focused

      if (selecting === 'from' && !hasTo)
        return hasFrom ? this.findSelectionRange({ from: value.from, to: value.from }, date) : null
      if (selecting === 'to' && !hasFrom)
        return hasTo ? this.findSelectionRange({ from: value.to, to: value.to }, date) : null

      if (hasFrom && hasTo) {
        return this.findSelectionRange(value, date)
      } else if (hasFrom && hasFocused) {
        return this.findSelectionRange({ from: value.from, to: focused }, date)
      } else if (hasTo && hasFocused) {
        return this.findSelectionRange({ from: focused, to: value.to }, date)
      } else if (hasFrom) {
        return this.findSelectionRange({ from: value.from, to: value.from }, date)
      } else if (hasTo) {
        return this.findSelectionRange({ from: value.to, to: value.to }, date)
      }
    }

    return null
  }

  normalizeDisabledRange({ from, to }, date) {
    if (!from && !to) return null

    const first = UTCDate(date.getFullYear(), date.getMonth(), 1)
    const last = lastDayOfMonth(first)

    if (!from) {
      if (first.getTime() < to.getTime()) from = first
    } else if (!to) {
      if (from.getTime() < last.getTime()) to = last
    }

    return { from, to }
  }

  createDisabledData(date) {
    return this.props.disabledDates
      .map(value => this.normalizeDisabledRange(value, date))
      .filter(Boolean)
      .map(value => this.findSelectionRange(value, date))
      .filter(Boolean)
  }

  createMonthData(reference, offsetMonth) {
    const date = new Date(reference)
    const focused = this.state.focused

    date.setMonth(date.getMonth() + offsetMonth)

    const year = date.getFullYear()
    const month = date.getMonth()
    const selected = this.createSelectionData(date)
    const disabled = this.createDisabledData(date)

    return {
      key: month + '/' + year,
      year,
      month,
      selected,
      disabled,
      focused: focused && year === focused.getFullYear() && month === focused.getMonth() ? focused.getDate() : null
    }
  }

  render() {
    const date = this.referenceDate

    return (
      <div className={classnames(this.props.className, 'picker').use(styles)}>
        {range(this.props.monthsToDisplay)
          .map(index => this.createMonthData(date, index))
          .map(({ key, ...props }, offset) => (
            <Month {...props} key={key} onDateFocus={this.handleDateFocus} onDateSelect={this.handleDateSelect}>
              <Jumper
                year={props.year}
                month={props.month}
                offset={offset}
                hasPrev={offset === 0}
                hasNext={offset + 1 === this.props.monthsToDisplay}
                onJump={this.handleJump}
              />
            </Month>
          ))}
        {this.props.children}
      </div>
    )
  }
}
