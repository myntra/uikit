import React from 'react'
import PropTypes from 'prop-types'
import styles from './InputDate.css' //eslint-disable-line

const YearComponent = ({ currentYear, onYearSelect }) => {
  let startYearValue = currentYear - 10
  let endYearValue = currentYear + 10
  const yearArray = []
  if (startYearValue < 0) {
    startYearValue = 0
    endYearValue = 20
  }
  for (let i = startYearValue; i < endYearValue; i++) {
    yearArray.push(i)
  }

  return (
    <div className={styles.selectWrapper}>
      <select value={currentYear} onChange={event => onYearSelect(Number(event.target.value))}>
        {yearArray.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

YearComponent.propTypes = {
  currentYear: PropTypes.number.isRequired,
  onYearSelect: PropTypes.func.isRequired
}

export default YearComponent
