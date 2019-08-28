import { createRef } from '@myntra/uikit-utils'

export * from './input-date-utils'

import React, { PureComponent, ReactNode, RefObject } from 'react'
import Dropdown from '@myntra/uikit-component-dropdown'

import classnames from './input-date.module.scss'
import { format, parse, isDateEqual } from './input-date-utils'
import { isDateRange, DateRange } from './input-date-helpers'
import InputDateValue from './input-date-value'
import InputDatePicker, {
  Props as InputDatePickerProps,
} from './input-date-picker'

export interface Props extends InputDatePickerProps {
  /**
   * The date format to format value for displaying.
   */
  displayFormat?: string
}

/**
 * A component to read date and date ranges.
 *
 * @since 0.0.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-date
 */
export default class InputDate extends PureComponent<
  Props,
  {
    isOpen: boolean
    openToDate: Date | null
    activeRangeEnd: 'from' | 'to'
    isRangeSelectionActive: boolean
  }
> {
  static Picker = InputDatePicker

  static defaultProps = {
    disabled: false,
    range: false,
  }

  wrapperRef: RefObject<HTMLDivElement>

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      openToDate: null,
      activeRangeEnd: null,
      isRangeSelectionActive: false,
    }

    this.wrapperRef = createRef()
  }

  get displayFormat() {
    return this.props.displayFormat || this.props.format || 'yyyy-MM-dd'
  }

  get displayValue() {
    return this.props.value
      ? format(this.props.value, this.displayFormat)
      : this.props.range
      ? {}
      : ''
  }

  get displayActiveRangeEnd() {
    const { value, range } = this.props
    if (!this.state.isOpen) return null
    if (this.state.activeRangeEnd) return this.state.activeRangeEnd
    if (value && isDateRange(value, range) && value.from && value.to)
      return 'to'
    return 'from'
  }

  get openToDate() {
    const { value, range, format } = this.props
    if (this.state.openToDate) return this.state.openToDate

    if (value) {
      if (isDateRange(value, range)) {
        return parse(
          this.state.activeRangeEnd === 'to'
            ? value.to || value.from
            : value.from || value.to,
          format
        )
      } else {
        return parse(value, format)
      }
    }

    return null
  }

  handleOpenToDateChange = (openToDate: Date) => this.setState({ openToDate })

  // TODO: Check again.
  handleDisplayValueChange = (newValue: Date | { from?: Date; to?: Date }) => {
    const { value: oldValue, onChange, range } = this.props
    if (!onChange) return

    let value

    if (isDateRange(newValue, range) && isDateRange(oldValue, range)) {
      value = { ...oldValue, ...newValue }

      if (newValue.from && newValue.to) {
        const [from, to] = [newValue.from, newValue.to]
          .filter(Boolean)
          .sort((a, b) => a.getTime() - b.getTime())

        value = { from, to }
      }
    } else {
      value = newValue
    }

    onChange(this.props.format ? format(value, this.props.format) : value)
  }

  handleRangeFocus = (value: 'from' | 'to') =>
    this.setState({ activeRangeEnd: value })
  handleChange = (newValue: Date | DateRange) => {
    if (!this.props.onChange) return

    const { value: oldValue, range } = this.props
    let shouldBeClosed = !!(newValue && !this.props.value)

    if (isDateRange(oldValue, range) && isDateRange(newValue, range)) {
      shouldBeClosed = !!(newValue && newValue.from && newValue.to)

      let nextSelection = null

      if (shouldBeClosed && oldValue) {
        const hasFromChanged = !isDateEqual(oldValue.from, newValue.from)
        const hasToChanged = !isDateEqual(oldValue.to, newValue.to)

        // Edited from. Wait for to.
        if (hasFromChanged && !hasToChanged) {
          nextSelection = 'to'
          shouldBeClosed = false
        }
      } else {
        if (!newValue.to) nextSelection = 'to'
        if (!newValue.from) nextSelection = 'from'
      }

      this.setState({
        isRangeSelectionActive: !shouldBeClosed,
        activeRangeEnd: nextSelection,
      })
    }

    this.props.onChange(
      this.props.format ? format(newValue, this.props.format) : newValue
    )

    if (shouldBeClosed) {
      this.close()
    }
  }

  handleDropdownOpen = () =>
    this.setState({ isOpen: true, openToDate: this.openToDate || new Date() })
  handleDropdownClose = () => this.close()

  close = () =>
    this.setState({ isOpen: false, activeRangeEnd: null, openToDate: null })

  render() {
    const { className, displayFormat: _, children, ...props } = this.props
    const { isOpen, activeRangeEnd } = this.state
    const { displayValue, displayFormat, displayActiveRangeEnd } = this

    return (
      <Dropdown
        auto
        container
        className={classnames(className, 'input-date')}
        isOpen={isOpen}
        renderTrigger={(events) => (
          <InputDateValue
            {...events}
            range={props.range}
            value={displayValue}
            format={displayFormat}
            active={displayActiveRangeEnd}
            onChange={this.handleDisplayValueChange}
            onRangeFocus={this.handleRangeFocus}
          />
        )}
        onOpen={this.handleDropdownOpen}
        onClose={this.handleDropdownClose}
      >
        <div className={classnames('wrapper')}>
          <InputDatePicker
            disabledDates={[]}
            monthsToDisplay={this.props.range ? 2 : 1}
            {...props}
            openToDate={this.openToDate}
            onOpenToDateChange={this.handleOpenToDateChange}
            onChange={this.handleChange}
            active={activeRangeEnd}
          />
        </div>
      </Dropdown>
    )
  }
}
