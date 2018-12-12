import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import InputDatePicker from './InputDatePicker'
import InputDateValue from './InputDateValue'
import Dropdown from '../Dropdown/Dropdown'
import { format, parse, DateType, DateRangeType, isDateEqual } from './InputDateUtils'
import classnames from './InputDate.module.css'

/**
 The InputDate component.

 @since 0.0.0
 @status REVIEWING
 @example
 <div>
 <InputDate displayFormat="MM/dd" value={this.state.value} onChange={(value) => this.setState({value})}/>
 <InputDate displayFormat="MM/dd" value={this.state.value} onChange={(value) => this.setState({value})}/>
 </div>
**/
export default class InputDate extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    /** Date format when using string dates. */
    format: PropTypes.string,
    /** Date format used only for displaying date values. */
    displayFormat: PropTypes.string,
    /** Select date range. */
    range: PropTypes.bool,
    /** Disabled */
    disabled: PropTypes.bool,
    /**
     * Change event handler.
     *
     * @typedef {string|Date} DateLike
     *
     * @function
     * @param {DateLike|{ from: DateLike, to: DateLike }} value
     */
    onChange: PropTypes.func,
    /**
     * Value
     *
     * @typedef {string|Date} DateType
     *
     * @typedef {{from: DateType, to: DateType}} DateRangeType
     */
    value: PropTypes.oneOfType([DateType, DateRangeType])
  }

  static defaultProps = {
    disabled: false,
    range: false
  }

  state = {
    isOpen: false,
    openToDate: null,
    activeRangeEnd: null,
    isRangeSelectionActive: false
  }

  constructor(props) {
    super(props)

    this.wrapperRef = element => {
      this.wrapperRef.current = element
    }
  }

  get displayFormat() {
    return this.props.displayFormat || this.props.format || 'yyyy-MM-dd'
  }

  get displayValue() {
    return format(this.props.value, this.displayFormat) || (this.props.range ? {} : '')
  }

  get displayActiveRangeEnd() {
    if (!this.state.isOpen) return null
    if (this.state.activeRangeEnd) return this.state.activeRangeEnd
    if (this.props.value && this.props.value.from && !this.props.value.to) return 'to'
    return 'from'
  }

  get openToDate() {
    if (this.state.openToDate) return this.state.openToDate
    if (!this.props.range) return parse(this.props.value, this.props.format)
    if (!this.props.value) return null
    return parse(
      this.state.activeRangeEnd === 'to'
        ? this.props.value.to || this.props.value.from
        : this.props.value.from || this.props.value.to,
      this.props.format
    )
  }

  handleOpenToDateChange = openToDate => this.setState({ openToDate })

  handleDisplayValueChange = value => {
    if (this.props.onChange) {
      if (this.props.range) {
        value = { ...this.props.value, ...value }

        if (value.from && value.to) {
          const [from, to] = [value.from, value.to].filter(Boolean).sort((a, b) => a.getTime() - b.getTime())

          value = { from, to }
        }
      }
      this.props.onChange(this.props.format ? format(value, this.props.format) : value)
    }
  }

  handleRangeFocus = value => this.setState({ activeRangeEnd: value })
  handleChange = value => {
    let shouldBeClosed = !!(value && !this.props.value)
    if (this.props.range) {
      shouldBeClosed = !!(value && value.from && value.to)
      let nextSelection = null
      if (shouldBeClosed && this.props.value) {
        const hasFromChanged = !isDateEqual(this.props.value.from, value.from)
        const hasToChanged = !isDateEqual(this.props.value.to, value.to)

        // Edited from. Wait for to.
        if (hasFromChanged && !hasToChanged) {
          nextSelection = 'to'
          shouldBeClosed = false
        }
      } else {
        if (!value.to) nextSelection = 'to'
        if (!value.from) nextSelection = 'from'
      }

      this.setState({
        isRangeSelectionActive: !shouldBeClosed,
        activeRangeEnd: nextSelection
      })
    }

    this.props.onChange && this.props.onChange(value)

    if (shouldBeClosed) {
      this.close()
    } else {
      this.skipClose()
    }
  }

  handleDropdownOpen = () => this.setState({ isOpen: true, openToDate: this.openToDate || new Date() })
  handleDropdownClose = () => this.close()

  closeDelayed = () => setTimeout(this.close, 150)

  close = () => {
    if (this._skipThisClose) {
      clearTimeout(this._skipThisClose)
      this._skipThisClose = null

      return
    }

    this.setState({ isOpen: false, activeRangeEnd: null, openToDate: null })
  }

  skipClose = () => {
    this._skipThisClose = setTimeout(() => (this._skipThisClose = null), 150)
  }

  render() {
    return (
      <Dropdown
        auto
        container
        className={classnames(this.props.className, 'input-date')}
        isOpen={this.state.isOpen}
        trigger={
          <InputDateValue
            range={this.props.range}
            value={this.displayValue}
            format={this.displayFormat}
            active={this.displayActiveRangeEnd}
            onRangeFocus={this.handleRangeFocus}
            onChange={this.handleDisplayValueChange}
            onBlur={this.closeDelayed}
          />
        }
        onOpen={this.handleDropdownOpen}
        onClose={this.handleDropdownClose}
      >
        <div className={classnames('wrapper')} onClick={this.skipClose}>
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
