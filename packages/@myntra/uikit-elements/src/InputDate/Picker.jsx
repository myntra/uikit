import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Month from './Month'
import SelectMonth from './SelectMonth'
import SelectYear from './SelectYear'

import styles from './InputDate.css' // eslint-disable-line
import { UTCDate } from './utils'

import PresetRange from './PresetRange'

export default class Picker extends PureComponent {
  static propTypes = {
    displayMonthsForRange: PropTypes.oneOf([1, 2, 3, 4]),
    onChange: PropTypes.func.isRequired,
    range: PropTypes.bool,
    disabled: Month.propTypes.disabled,
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date)
      })
    ]),
    presets: PropTypes.array,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date)
  }

  static defaultProps = {
    displayMonthsForRange: 2,
    range: false
  }

  state = {
    year: this.props.value // eslint-disable-line
      ? this.props.range
        ? this.props.value.from.getFullYear()
        : this.props.value.getFullYear()
      : new Date().getFullYear(),
    month: this.props.value // eslint-disable-line
      ? this.props.range
        ? this.props.value.from.getMonth()
        : this.props.value.getMonth()
      : new Date().getMonth(),
    focus: null
  }

  getSelection(year, month) {
    const { value, range } = this.props
    const selection = { ...value }

    if (range && selection.from) {
      if (!selection.to) {
        if (this.state.focus < selection.from) {
          selection.to = selection.from
          selection.from = this.state.focus
        } else selection.to = this.state.focus
      }
    } else if (!range && value && month === value.getMonth() && year === value.getFullYear()) {
      selection.from = selection.to = value // eslint-disable-line
    }

    return selection
  }

  handleDateSelection = date => {
    if (this.props.range) {
      if (
        !this.props.value || // null or undefined
        !this.props.value.from || // no from date
        (this.props.value.from && this.props.value.to) // both dates are selected. reset.
      ) {
        this.props.onChange({ from: date })
      } else if (this.props.value.from > date) {
        this.props.onChange({
          from: date,
          to: this.props.value.from
        })
      } else {
        this.props.onChange({
          ...this.props.value,
          to: date
        })
      }
    } else this.props.onChange(date)
  }

  handlePresetDateRangeSelection = ({ from, to }) => {
    this.props.onChange({ ...this.props.value, from, to })
  }

  handleBlur = () => {
    if (this.state.focus) this.setState({ focus: null })
  }

  renderMonthHeader(month, year, index) {
    const isFirst = index === 0
    const isLast = index + 1 === this.props.displayMonthsForRange
    const date = UTCDate(year, month, 1)
    const handleMonth = value => {
      date.setMonth(value - index)

      this.setState({ month: date.getMonth(), year: date.getFullYear() })
    }
    const handleYear = value => this.setState({ year: value })

    return (
      <div className={styles.pickerMonthHeader}>
        {isFirst && (
          <div className={styles.pickerPrevButton} title="Previous month" onClick={() => handleMonth(month - 1)}>
            {'<'}
          </div>
        )}
        <div className={styles.pickerMonthMeta}>
          <SelectMonth month={month} onMonthSelect={handleMonth} />
          <SelectYear currentYear={year} onYearSelect={handleYear} />
        </div>
        {(!this.props.range || isLast) && (
          <div className={styles.pickerNextButton} title="Next month" onClick={() => handleMonth(month + 1)}>
            {'>'}
          </div>
        )}
      </div>
    )
  }

  renderMonth(month, year, index) {
    const selection = this.getSelection(year, month)
    const { minDate, maxDate } = this.props

    return (
      <div className={styles.pickerMonth} key={`month-${month}-${year}`}>
        {this.renderMonthHeader(month, year, index)}
        <Month
          month={month}
          year={year}
          focused={this.state.focus}
          disabled={this.props.disabled}
          selected={selection}
          onSelect={this.handleDateSelection}
          onDateFocus={date => date !== this.state.focus && this.setState({ focus: date })}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    )
  }

  render() {
    const { year, month } = this.state
    const { displayMonthsForRange, range, presets, value } = this.props
    const cursor = UTCDate(year, month, 1)

    return (
      <div className={styles.picker}>
        <div className={styles.picker} onMouseLeave={this.handleBlur}>
          {this.renderMonth(month, year, 0)}
          {range &&
            Array.apply(null, { length: displayMonthsForRange - 1 }).map((_, i) => {
              cursor.setMonth(cursor.getMonth() + 1)
              return this.renderMonth(cursor.getMonth(), cursor.getFullYear(), i + 1)
            })}
        </div>
        {range && (
          <PresetRange presets={presets} onSelect={this.handlePresetDateRangeSelection} selectedDates={value || {}} />
        )}
      </div>
    )
  }
}
