import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Picker from './Picker/Picker'
import Month from './Picker/Month'
import Day from './Picker/Day'
import Jumper from './Picker/Jumper'
import { DateType, DateRangeType, parse, format } from './InputDateUtils'
import * as PRESETS from './presets'
import Preset from './Picker/Preset'

const DEFAULT_PRESETS = Object.values(PRESETS)

/**
 *
 * @since 0.0.0
 * @status EXPERIMENTAL
 * @example
 * <InputDatePicker range monthsToDisplay={4} value={this.state.value} onChange={value => this.setState({ value })} disabledDates={[{ from: new Date(), to: new Date() }]} />
 */
class InputDatePicker extends PureComponent {
  static propTypes = {
    /**
     * Value
     *
     * @typedef {string|Date} DateType
     *
     * @typedef {{from: DateType, to: DateType}} DateRangeType
     */
    value: PropTypes.oneOfType([DateType, DateRangeType]),
    /**
     * The param type of onChange handle is same the type of value prop.
     *
     * @typedef {string|Date} DateType
     *
     * @typedef {{from: DateType, to: DateType}} DateRangeType
     *
     * @function
     * @param {DateType|DateRangeType} value
     */
    onChange: PropTypes.func,
    presets: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.shape({
          range: PropTypes.bool,
          label: PropTypes.string.isRequired,
          /**
           * @typedef {{from: Date, to: Date}} DateRange
           *
           * @function
           * @param {Date} today
           * @returns {Date|DateRange}
           */
          value: PropTypes.func.isRequired
        })
      )
    ]),
    range: PropTypes.bool,
    monthsToDisplay: PropTypes.number,
    /**
     * @typedef {{from: DateType?, to: DateType?}} DateRangeType
     */
    disabledRanges: PropTypes.arrayOf(DateRangeType),
    /**
     * @typedef {string|Date} DateType
     */
    min: DateType,
    /**
     * @typedef {string|Date} DateType
     */
    max: DateType,
    format: PropTypes.string,
    /** @private */
    validate(props) {
      if (
        (props.range
          ? props.value && (typeof props.value.from === 'string' || typeof props.value.to === 'string')
          : typeof props.value === 'string') &&
        !props.format
      ) {
        throw new Error(`Set 'format' prop to 'YYYY-MM-DD' to use string dates.`)
      }
    }
  }

  static defaultProps = {
    range: false,
    disabledRanges: [],
    monthsToDisplay: 1
  }

  handleChange = value => {
    if (this.props.onChange) {
      this.props.onChange(this.props.format ? format(value, this.props.format) : value)
    }
  }

  normalize(dateOrDates) {
    // 1. Date or undefined or null
    if (dateOrDates instanceof Date) return dateOrDates
    // 2. Range object
    if (typeof dateOrDates === 'object' && dateOrDates) {
      const result = {}
      if ('from' in dateOrDates) result.from = this.normalize(dateOrDates.from)
      if ('to' in dateOrDates) result.to = this.normalize(dateOrDates.to)
      return result
    }
    // 3. String!
    if (typeof dateOrDates === 'string' && this.props.format) {
      return parse(dateOrDates, this.props.format)
    }

    return null
  }

  render() {
    const { value, onChange, disabledRanges, min, max, presets, ...props } = this.props
    const normalizedDate = this.normalize(value)

    return (
      <Picker
        {...props}
        value={normalizedDate}
        onChange={this.handleChange}
        disabledRanges={this.normalize(disabledRanges)}
        min={this.normalize(min)}
        max={this.normalize(max)}
      >
        {this.props.presets && (
          <Preset
            range={this.props.range}
            value={normalizedDate}
            onChange={this.handleChange}
            presets={this.props.presets === true ? DEFAULT_PRESETS : this.props.presets}
          />
        )}
      </Picker>
    )
  }
}

InputDatePicker.Day = Day
InputDatePicker.Month = Month
InputDatePicker.Picker = Picker
InputDatePicker.Jumper = Jumper
InputDatePicker.Preset = Preset

export default InputDatePicker
