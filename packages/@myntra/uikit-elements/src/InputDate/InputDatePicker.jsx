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
 * <InputDatePicker monthsToDisplay={4} value={this.state.value} onChange={value => this.setState({ value })} disabledDates={[{ from: new Date(), to: new Date() }]} />
 */
class InputDatePicker extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([DateType, DateRangeType]),
    /**
     * The param type of onChange handle is same the type of value prop.
     *
     * @function
     * @param {string|Date|Object.<string, Date>} value
     */
    onChange: PropTypes.func,
    presets: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.shape({
          range: PropTypes.bool,
          label: PropTypes.string.isRequired,
          value: PropTypes.func.isRequired
        })
      )
    ]),
    range: PropTypes.bool,
    monthsToDisplay: PropTypes.number,
    disabledRanges: PropTypes.arrayOf(DateRangeType),
    min: DateType,
    max: DateType,
    format: PropTypes.string,
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
      this.props.onChange(format(value, this.props.format))
    }
  }

  normalize(dateOrDates) {
    // 1. Date or undefined or null
    if (!dateOrDates || dateOrDates instanceof Date) return dateOrDates
    // 2. List of Dates
    if (Array.isArray(dateOrDates)) return dateOrDates.map(date => this.normalize(date))
    // 3. Range object
    if (typeof dateOrDates === 'object' && dateOrDates) {
      const result = {}
      if ('from' in dateOrDates) result.from = this.normalize(dateOrDates.from)
      if ('to' in dateOrDates) result.to = this.normalize(dateOrDates.to)
      return result
    }
    // 4. String!
    if (typeof dateOrDates === 'string') {
      return parse(dateOrDates, this.props.format)
    }
  }

  render() {
    const { value, onChange, disabledRanges, min, max, presets, ...props } = this.props

    return (
      <Picker
        {...props}
        value={this.normalize(value)}
        onChange={this.handleChange}
        disabledRanges={this.normalize(disabledRanges)}
        min={this.normalize(min)}
        max={this.normalize(max)}
      >
        {this.props.presets && (
          <Preset
            range={this.props.range}
            value={this.props.value}
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
