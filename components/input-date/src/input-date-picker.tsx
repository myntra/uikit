import React, { PureComponent, ReactNode } from 'react'

import MonthGroup from './picker/month-group'
import Month from './picker/month'
import Day from './picker/day'
import { parse, format } from './input-date-utils'
import { DateRange, StringDateRange, is } from './input-date-helpers'

// import * as PRESETS from './presets'
// import Preset from './Picker/Preset'

// const DEFAULT_PRESETS = Object.values(PRESETS)

export interface InputDatePickerProps<
  DateLike = string | Date,
  DateLikeOrDateRangeLike = string | Date | DateRange | StringDateRange
> extends BaseProps {
  /**
   * Current value of the text input field.
   */
  value?: DateLikeOrDateRangeLike

  /**
   * The callback function called when the value changes.
   */
  onChange?(value: DateLikeOrDateRangeLike): void

  /**
   * The date format to parse and format value when using string dates.
   */
  format?: string

  /**
   * Set the picker in range selection mode. The value would have two dates (`from` and `to`).
   */
  range?: boolean

  /**
   * Custom renderer to display day in the picker dropdown.
   */
  renderDate?(props: { date: Date; children: ReactNode }): ReactNode

  monthsToDisplay?: number

  disabledRanges?: Array<DateRange | StringDateRange>

  min?: DateLike

  max?: DateLike

  presets?: Array<
    | {
        range: false
        label: string
        value(): Date
      }
    | {
        range: true
        label: string
        value(): { from: Date; to: Date }
      }
  >
}

/**
 * @since 0.0.0
 * @status REVIEWING
 * @category input
 * @see http://uikit.myntra.com/components/input-date#inputdatepicker
 */
export default class InputDatePicker extends PureComponent<
  InputDatePickerProps
> {
  static MonthGroup = MonthGroup
  static Month = Month
  static Day = Day

  static propTypes = {
    /** @private */
    validate(props) {
      if (
        (props.range
          ? props.value &&
            (typeof props.value.from === 'string' ||
              typeof props.value.to === 'string')
          : typeof props.value === 'string') &&
        !props.format
      ) {
        throw new Error(
          `Set 'format' prop to 'YYYY-MM-DD' to use string dates.`
        )
      }
    },
  }

  static defaultProps = {
    range: false,
    disabledRanges: [],
    monthsToDisplay: 1,
  }

  normalize<T extends null | string | Date | DateRange | StringDateRange>(
    dateOrDates: T
  ): T extends string
    ? Date
    : T extends StringDateRange
    ? DateRange
    : T extends Date
    ? Date
    : T extends DateRange
    ? DateRange
    : T extends null
    ? null
    : never {
    if (!dateOrDates) return null
    // 1. Date or undefined or null
    if (dateOrDates instanceof Date) return dateOrDates as any
    // 2. Range object
    if (
      is<DateRange | StringDateRange>(
        dateOrDates,
        typeof dateOrDates === 'object'
      )
    ) {
      const result: DateRange = {}

      if ('from' in dateOrDates) result.from = this.normalize(dateOrDates.from)
      if ('to' in dateOrDates) result.to = this.normalize(dateOrDates.to)

      return result as any
    }
    // 3. String!
    if (
      is<string>(
        dateOrDates,
        typeof dateOrDates === 'string' && !!this.props.format
      )
    ) {
      return parse(dateOrDates, this.props.format) as any
    }

    return null
  }

  handleChange = (value: Date | DateRange) => {
    if (this.props.onChange) {
      this.props.onChange(
        this.props.format ? format(value, this.props.format) : value
      )
    }
  }

  render() {
    const {
      value,
      onChange,
      disabledRanges,
      min,
      max,
      presets,
      ...props
    } = this.props
    const normalizedDate = this.normalize(value)

    return (
      <MonthGroup
        {...props}
        value={normalizedDate}
        onChange={this.handleChange}
        disabledRanges={disabledRanges.map(this.normalize)}
        min={this.normalize(min)}
        max={this.normalize(max)}
      >
        {/*this.props.presets && (
          <Preset
            range={this.props.range}
            value={normalizedDate}
            onChange={this.handleChange}
            presets={
              this.props.presets === true ? DEFAULT_PRESETS : this.props.presets
            }
          />
        )*/}
      </MonthGroup>
    )
  }
}
