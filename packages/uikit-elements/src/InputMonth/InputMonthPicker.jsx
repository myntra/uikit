import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MonthPane from './picker/MonthPane'
import YearPane from './picker/YearPane'
import classnames from './InputMonthPicker.module.css'

/**
 * Month selection utility.
 *
 * @since 0.7.0
 * @status EXPERIMENTAL
 * @example
 * <InputMonthPicker value={this.state.value || { month: 2, year: 2019 }} onChange={value => this.setState({ value })}  />
 */
class InputMonthPicker extends Component {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    value: PropTypes.shape({
      month: PropTypes.number,
      year: PropTypes.number
    }),
    /** @type {{({ month: number, year: number }) => void }} */
    onChange: PropTypes.func,
    /** @type {{({ month: number, year: number }) => 'info' | 'danger' | 'warning' | 'success'  | 'disabled' }} */
    highlight: PropTypes.func,
    _validate({ value }) {
      if (value && typeof value.month === 'number' && (value.month < 1 || value.month > 12)) {
        throw new Error(`'value.month' should be a numeric value between 1 and 12.`)
      }
    }
  }

  highlight = month => {
    if (this.props.highlight) {
      this.props.highlight({ month, year: this.value ? this.value.year : undefined })
    }
  }

  handleChange = newValue => this.props.onChange && this.props.onChange({ ...this.props.value, ...newValue })
  handleMonthChange = month => this.handleChange({ month })
  handleYearChange = year => this.handleChange({ year })

  render() {
    const value = this.props.value || {}
    return (
      <div className={classnames('container', this.props.className)}>
        <div className={classnames('left-pane')}>
          <div className={classnames('title')}>Month</div>
          <MonthPane value={value.month} onChange={this.handleMonthChange} highlight={this.highlight} />
        </div>
        <div className={classnames('right-pane')}>
          <div className={classnames('title')}>Year</div>
          <YearPane value={value.year} onChange={this.handleYearChange} highlight={this.highlight} />
        </div>
      </div>
    )
  }
}

export default InputMonthPicker
