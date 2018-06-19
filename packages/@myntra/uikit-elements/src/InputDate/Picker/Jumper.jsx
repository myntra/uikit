import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import SelectYear from './SelectYear'
import SelectMonth from './SelectMonth'
import styles from './Jumper.css'
import { UTCDate } from '../InputDateUtils'

/**
 {describe component}

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <InputDatePicker.Jumper />
 */
class Jumper extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    /**
     * @function
     * @param {Date} date
     */
    onJump: PropTypes.func.isRequired
  }

  handleJump = (year, month) => {
    const date = UTCDate(year, month, 1)

    date.setMonth(date.getMonth() - this.props.offset)

    this.props.onJump(date)
  }
  handleYearSelect = year => this.handleJump(year, this.props.month)
  handleMonthSelect = month => this.handleJump(this.props.year, month)

  render() {
    const { year, month, offset, className, onJump, ...props } = this.props

    return (
      <div {...props} className={classnames(className, 'jumper').use(styles)}>
        <SelectMonth
          month={month}
          onMonthSelect={this.handleMonthSelect}
          className={classnames('select').use(styles)}
        />
        <SelectYear className={classnames('select').use(styles)} year={year} onYearSelect={this.handleYearSelect} />
      </div>
    )
  }
}

Jumper.SelectMonth = SelectMonth
Jumper.SelectYear = SelectYear

export default Jumper
