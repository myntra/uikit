import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import SelectYear from './SelectYear'
import SelectMonth from './SelectMonth'
import styles from './Jumper.css'
import { UTCDate } from '../InputDateUtils'
import Icon from '../../Icon/Icon'

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
    onJump: PropTypes.func.isRequired,
    hasPrev: PropTypes.bool,
    hasNext: PropTypes.bool
  }

  handleJump = (year, month, diff = 0) => {
    const date = UTCDate(year, month, 1)

    date.setMonth(date.getMonth() + diff - this.props.offset)

    this.props.onJump(date)
  }
  handleNext = () => this.handleJump(this.props.year, this.props.month, 1)
  handlePrev = () => this.handleJump(this.props.year, this.props.month, -1)
  handleYearSelect = year => this.handleJump(year, this.props.month)
  handleMonthSelect = month => this.handleJump(this.props.year, month)

  render() {
    const { year, month, offset, className, onJump, hasNext, hasPrev, ...props } = this.props

    return (
      <div {...props} className={classnames(className, 'jumper').use(styles)}>
        {hasPrev ? (
          <div className={classnames('prev').use(styles)} role="button" onClick={this.handlePrev}>
            <Icon name="chevron-left" />
          </div>
        ) : (
          <div className={classnames('prev', 'placeholder').use(styles)} />
        )}
        <SelectMonth
          month={month}
          onMonthSelect={this.handleMonthSelect}
          className={classnames('select').use(styles)}
        />
        <SelectYear className={classnames('select').use(styles)} year={year} onYearSelect={this.handleYearSelect} />
        {hasNext ? (
          <div className={classnames('next').use(styles)} role="button" onClick={this.handleNext}>
            <Icon name="chevron-right" />
          </div>
        ) : (
          <div className={classnames('next', 'placeholder').use(styles)} />
        )}
      </div>
    )
  }
}

Jumper.SelectMonth = SelectMonth
Jumper.SelectYear = SelectYear

export default Jumper
