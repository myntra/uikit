import React from 'react'
import PropTypes from 'prop-types'

const MONTHS = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')
function SelectMonth({ month, onMonthSelect, ...props }) {
  return (
    <div {...props}>
      <select value={month} onChange={event => onMonthSelect(Number(event.target.value))}>
        {MONTHS.map((item, index) => (
          <option value={index} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

SelectMonth.propTypes = {
  month: PropTypes.number.isRequired,
  onMonthSelect: PropTypes.func.isRequired
}

export default SelectMonth
