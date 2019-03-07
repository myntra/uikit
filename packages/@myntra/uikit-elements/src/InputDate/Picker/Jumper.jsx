import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import SelectYear from './SelectYear'
import SelectMonth from './SelectMonth'
import classnames from './Jumper.module.css'
import { UTCDate } from '../InputDateUtils'
import { Icon } from '../../index.js'

/**
 Select year and month to jump to a date.

 @since 0.0.0
 @status REVIEWING
 @example
 <InputDatePicker.Jumper year={this.state.year || 2018} month={this.state.month || 0} offset={0} hasNext hasPrev
    onJump={date => this.setState({ year: date.getUTCFullYear(), month: date.getUTCMonth() })} />
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

    date.setMonth(date.getUTCMonth() + diff - this.props.offset)

    this.props.onJump(date)
  }
  handleNext = () => this.handleJump(this.props.year, this.props.month, 1)
  handlePrev = () => this.handleJump(this.props.year, this.props.month, -1)
  handleYearSelect = year => this.handleJump(year, this.props.month)
  handleMonthSelect = month => this.handleJump(this.props.year, month)

  render() {
    const { year, month, offset, className, onJump, hasNext, hasPrev, ...props } = this.props

    return (
      <div {...props} className={classnames(className, 'jumper')}>
        {hasPrev ? (
          <div className={classnames('prev')} role="button" tabIndex={-1} onClick={this.handlePrev}>
            <Icon name="chevron-left" />
          </div>
        ) : (
          <div className={classnames('prev', 'placeholder')} />
        )}
        <SelectMonth month={month} onMonthSelect={this.handleMonthSelect} className={classnames('select')} />
        <SelectYear className={classnames('select')} year={year} onYearSelect={this.handleYearSelect} />
        {hasNext ? (
          <div className={classnames('next')} role="button" tabIndex={-1} onClick={this.handleNext}>
            <Icon name="chevron-right" />
          </div>
        ) : (
          <div className={classnames('next', 'placeholder')} />
        )}
      </div>
    )
  }
}

Jumper.SelectMonth = SelectMonth
Jumper.SelectYear = SelectYear

export default Jumper
