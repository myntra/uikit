import React from 'react'
import PropTypes from 'prop-types'
import styles from './InputDate.css' //eslint-disable-line

const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MonthComponent = ({ month, onMonthSelect }) => (
  <div className={styles.selectWrapper}>
    <select value={month} onChange={event => onMonthSelect(Number(event.target.value))}>
      {monthArr.map((item, index) => (
        <option value={index} key={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
)

MonthComponent.propTypes = {
  month: PropTypes.number.isRequired,
  onMonthSelect: PropTypes.func.isRequired
}

export default MonthComponent
