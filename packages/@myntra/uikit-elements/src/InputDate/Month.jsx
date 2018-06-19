import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Day from './Day'
import { UTCDate } from './utils'

import styles from './InputDate.css'

function isSelected(d, selected) {
  if (selected.from && selected.to) {
    return selected.from <= d && d <= selected.to
  }
  if (selected.from) return selected.from <= d
  if (selected.to) return d <= selected.to
  return false
}

function isEqual(a, b) {
  if (!a || !b) return false

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isSelectedLoose(d, selected, isFirst) {
  if (isFirst && isEqual(d, selected.from)) return false
  if (!isFirst && isEqual(d, selected.to)) return false

  return isSelected(d, selected)
}

function chunk(items, size) {
  const length = Math.ceil(items.length / size)

  // eslint-disable-next-line
  return Array.apply(null, { length }).map((_, i) => items.slice(i * size, i * size + size))
}

const dayHeaders = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default class Month extends PureComponent {
  static propTypes = {
    month: PropTypes.number.isRequired, // zero indexed month. 0 - Jan, 1 - Feb ...
    year: PropTypes.number.isRequired,
    selected: PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date)
    }).isRequired,
    focused: PropTypes.instanceOf(Date),
    disabled: PropTypes.oneOfType([
      PropTypes.shape({
        from: PropTypes.instanceOf(Date).isRequired,
        to: PropTypes.instanceOf(Date).isRequired
      }),
      PropTypes.arrayOf(PropTypes.instanceOf(Date))
    ]),
    onDateFocus: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      this._disabled = null
    }
  }

  get selected() {
    return this.props.selected || {}
  }

  get disabled() {
    if (this._disabled) return this._disabled

    let dates = []
    if (Array.isArray(this.props.disabled)) {
      dates = this.props.disabled
    }
    if (this.props.disabled) {
      const it = new Date(this.props.disabled.from)
      while (it < this.props.disabled.to) {
        dates.push(it)

        it.setDate(it.getDate() + 1)
      }
    }

    this._disabled = dates.reduce((acc, it) => ({ ...acc, [it.toDateString()]: true }), {})

    return this._disabled
  }

  handleDaySelection = (event, date) => {
    this.props.onSelect(date)
  }

  handleDayFocus = (event, date) => {
    if (this.props.onDateFocus) this.props.onDateFocus(date)
  }

  render() {
    const { month, year, minDate, maxDate } = this.props
    const selected = this.selected
    const disabled = this.disabled
    const firstOfMonth = UTCDate(year, month, 1)
    const firstDayOfWeek = firstOfMonth.getDay()
    const days = []
    const isFirstSelected = isSelectedLoose(firstOfMonth, selected, true)

    for (let i = 0; i < firstDayOfWeek; i += 1) {
      days.push(<Day isEmpty isSelected={isFirstSelected} onSelect={() => {}} onFocus={this.handleDayFocus} key={i} />)
    }
    const it = new Date(firstOfMonth)
    let lastDateOfMonth = 1
    while (it.getMonth() === firstOfMonth.getMonth()) {
      lastDateOfMonth = it.getDate()
      const isOutOfRange = (minDate && minDate > it) || (maxDate && maxDate < it)
      days.push(
        <Day
          key={it}
          date={new Date(it)}
          isDisabled={disabled[it.toDateString()] || isOutOfRange}
          isFocused={this.props.focused && it.toDateString() === this.props.focused.toDateString()}
          isStart={isEqual(it, selected.from)}
          isEnd={isEqual(it, selected.to)}
          isSelected={isSelected(it, selected)}
          onSelect={this.handleDaySelection}
          onFocus={this.handleDayFocus}
        />
      )
      it.setDate(it.getDate() + 1)
    }

    const lastOfMonth = new Date(year, month, lastDateOfMonth, 0, 0, 0, 0)
    const lastDayOfMonth = lastOfMonth.getDay()
    const isLastSelected = isSelectedLoose(lastOfMonth, selected)

    for (let i = lastDayOfMonth + 1; i < 7; i += 1) {
      days.push(<Day isEmpty isSelected={isLastSelected} onSelect={() => {}} onFocus={this.handleDayFocus} key={i} />)
    }

    const weeks = chunk(days, 7).map((week, i) => (
      <tr className={styles.gridWeek} key={i}>
        {week}
      </tr>
    ))

    return (
      <table className={styles.gridMonth}>
        <thead className={styles.gridWeekHeader}>
          <tr>
            {dayHeaders.map(h => (
              <th className={styles.gridDayHeader} title={h} key={h}>
                {h.charAt(0)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
    )
  }
}
