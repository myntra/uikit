export * from './date-utils'

import React, { PureComponent, ReactNode, RefObject } from 'react'

// import InputDatePicker from './InputDatePicker'
// import InputDateValue from './InputDateValue'
import Dropdown from '@myntra/uikit-component-dropdown'
import { format, parse, isDateEqual } from './date-utils'
import classnames from './input-date.module.scss'

export interface InputDateProps<
  D = string | Date,
  V = D | { from?: D; to?: D }
> extends BaseProps {
  /**
   * Current value of the text input field.
   */
  value?: V

  /**
   * The callback function called when the value changes.
   */
  onChange?(value: V): void

  /**
   * The date format to parse and format value when using string dates.
   */
  format?: string

  /**
   * The date format to format value for displaying.
   */
  displayFormat?: string

  /**
   * Set the picker in range selection mode. The value would have two dates (`from` and `to`).
   */
  range?: boolean

  /**
   * Custom renderer to display day in the picker dropdown.
   */
  renderDate?(props: { date: Date; children: ReactNode }): ReactNode
}

function isStringDate(
  value:
    | undefined
    | string
    | Date
    | { from?: string | Date; to?: string | Date },
  format?: string
): value is undefined | string | { from?: string; to?: string } {
  return typeof format === 'string'
}
function isDate(
  value:
    | undefined
    | string
    | Date
    | { from?: string | Date; to?: string | Date },
  format?: string
): value is undefined | Date | { from?: Date; to?: Date } {
  return typeof format !== 'string'
}
function isDateRange<D extends string | Date>(
  value: undefined | D | { from?: D; to?: D },
  range?: boolean
): value is undefined | { from?: D; to?: D } {
  return range === true
}

/**
 * The InputDate component.
 *
 * @since 0.0.0
 * @status REVIEWING
 */
export default class InputDate extends PureComponent<
  InputDateProps,
  {
    isOpen: boolean
    openToDate: Date | null
    activeRangeEnd: 'from' | 'to'
    isRangeSelectionActive: boolean
  }
> {
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

    this.wrapperRef = React.createRef()
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
  handleChange = (newValue: Date | { from?: Date; to?: Date }) => {
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
    return (
      <Dropdown
        auto
        container
        className={classnames(this.props.className, 'input-date')}
        isOpen={this.state.isOpen}
        renderTrigger={(props) => (
          <InputDateValue
            {...props}
            range={this.props.range}
            value={this.displayValue}
            format={this.displayFormat}
            active={this.displayActiveRangeEnd}
            onRangeFocus={this.handleRangeFocus}
            onChange={this.handleDisplayValueChange}
          />
        )}
        onOpen={this.handleDropdownOpen}
        onClose={this.handleDropdownClose}
      >
        <div className={classnames('wrapper')}>
          <InputDatePicker
            presets={this.props.range}
            disabledDates={[]}
            monthsToDisplay={this.props.range ? 2 : 1}
            {...this.props}
            openToDate={this.openToDate}
            onOpenToDateChange={this.handleOpenToDateChange}
            onChange={this.handleChange}
            active={this.state.activeRangeEnd}
          />
        </div>
      </Dropdown>
    )
  }
}
