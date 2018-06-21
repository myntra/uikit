import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { memoize, classnames } from '@myntra/uikit-utils'

import Day from './Day'

import styles from './Month.css'
import { UTCDate } from '../InputDateUtils'
import dayJS from 'dayjs'

const DAYS_OF_WEEK = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',')
const CLASS = {
  month: classnames('month').use(styles),
  header: classnames('header').use(styles),
  day: classnames('day-header').use(styles),
  days: classnames('days').use(styles)
}

/**
 * @example
 * <InputDatePicker.Month year={2016} month={2} />
 */
export default class Month extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    /** @private */
    children: PropTypes.any,
    year: PropTypes.number.isRequired,
    /** zero indexed month. 0 - Jan, 1 - Feb ... */
    month: PropTypes.number.isRequired,
    focused: PropTypes.number,
    selected: PropTypes.shape({ from: PropTypes.number, to: PropTypes.number }),
    disabled: PropTypes.arrayOf(PropTypes.shape({ from: PropTypes.number, to: PropTypes.number })),
    onDateFocus: PropTypes.func,
    onDateSelect: PropTypes.func
  }

  static defaultProps = {
    selected: {},
    disabled: []
  }

  makeDayValidator(ranges) {
    const daysInCurrentMonth =
      dayJS(UTCDate(this.props.year, this.props.month, 1))
        .endOf('month')
        .toDate()
        .getUTCDate() + 1
    const isValid = Array.apply(null, { length: daysInCurrentMonth + 1 }).map(Boolean)

    ranges.forEach(({ from, to }) => {
      for (let i = from; i <= to; ++i) isValid[Math.min(i, daysInCurrentMonth)] = true
    })

    return day => isValid[Math.min(day, daysInCurrentMonth)]
  }

  dayDisabledValidator = memoize(args => this.makeDayValidator(args))

  daySelectedValidator(first, last) {
    const hasSelection = this.props.selected && ('from' in this.props.selected || 'to' in this.props.selected)
    const from =
      hasSelection && 'from' in this.props.selected ? this.props.selected.from : this.props.focused || this.lastFocus
    const to =
      hasSelection && 'to' in this.props.selected ? this.props.selected.to : this.props.focused || this.lastFocus
    const low = Math.min(from || 0, to)
    const high = Math.max(from, to || last.getUTCDate() + 1)

    if (this.props.focused) this.lastFocus = this.props.focused

    return date => hasSelection && low <= date && date <= high
  }

  handleDateSelection = date => {
    if (this.props.onDateSelect) this.props.onDateSelect(date.getUTCDate(), date)
  }

  handleDateFocus = date => {
    if (this.props.onDateFocus) this.props.onDateFocus(date ? date.getUTCDate() : null, date)
  }

  render() {
    const { month, year, focused } = this.props
    const isDayDisabled = this.dayDisabledValidator(this.props.disabled)
    const dateOnFirstOfMonth = UTCDate(year, month, 1)
    const dateOnLastOfMonth = dayJS(dateOnFirstOfMonth)
      .endOf('month')
      .toDate()
    const isDaySelected = this.daySelectedValidator(dateOnFirstOfMonth, dateOnLastOfMonth)
    const days = []

    for (let i = 0; i < dateOnFirstOfMonth.getDay(); i += 1)
      days.push(
        <Day
          key={'pre-' + i}
          selected={isDaySelected(0 /* selection starts in previous month. */)}
          disabled={isDayDisabled(0)}
          onFocus={this.handleDateFocus}
        />
      )
    for (let day = 1; day <= dateOnLastOfMonth.getUTCDate(); day += 1)
      days.push(
        <Day
          key={'day-' + year + '-' + month + '-' + day}
          day={day}
          year={year}
          month={month}
          focused={day === focused}
          isSelectionStart={!isDaySelected(day - 1) && isDaySelected(day)}
          isSelectionEnd={isDaySelected(day) && !isDaySelected(day + 1)}
          disabled={isDayDisabled(day)}
          selected={isDaySelected(day)}
          onSelect={this.handleDateSelection}
          onFocus={this.handleDateFocus}
        />
      )

    for (let i = dateOnLastOfMonth.getDay() + 1; i < 7; i += 1)
      days.push(
        <Day
          key={'post' + i}
          selected={isDaySelected(dateOnLastOfMonth.getUTCDate() + 1 /* selection ends in next month */)}
          disabled={isDayDisabled(dateOnLastOfMonth.getUTCDate() + 1)}
          onFocus={this.handleDateFocus}
        />
      )

    return (
      <div className={classnames(this.props.className, CLASS.month)}>
        {this.props.children}
        <div className={CLASS.header}>
          {DAYS_OF_WEEK.map(day => (
            <div className={CLASS.day} title={day} key={day}>
              {day.charAt(0)}
            </div>
          ))}
        </div>
        <div className={CLASS.days}>{days}</div>
      </div>
    )
  }
}
