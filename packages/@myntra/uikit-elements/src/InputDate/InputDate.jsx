import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import InputDatePicker from './InputDatePicker'
import InputDateValue from './InputDateValue'
import Dropdown from '../Dropdown/Dropdown'
import { format, parse, DateType, DateRangeType } from './InputDateUtils'
import styles from './InputDate.css'

/**
 The InputDate component.

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <InputDate range displayFormat="MM/dd" value={this.state.value} onChange={(value) => {console.log(value); this.setState({value})}}/>
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
    onChange: PropTypes.func.isRequired,
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
    this.dropdownRef = ref => {
      this.dropdownRef.current = ref
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
    return parse(this.props.value.from || this.props.value.to, this.props.format)
  }

  handleOpenToDateChange = openToDate => this.setState({ openToDate })

  handleDisplayValueChange = value => {
    if (this.props.onChange) {
      if (this.props.range) {
        value = { ...this.props.value, ...value }

        if (value.foo && value.to) {
          const [from, to] = [value.from, value.to].filter(Boolean).sort((a, b) => a.getTime() - b.getTime())

          value = { from, to }
        }
      }
      this.props.onChange(format(value, this.props.format))
    }
  }

  handleRangeFocus = value => {
    this.setState({ activeRangeEnd: value })
  }

  handleChange = value => {
    if (this.props.range) {
      const bothSelected = !!(value.from && value.to)
      this.setState({ activeRangeEnd: null, isRangeSelectionActive: !bothSelected })
    }

    this.props.onChange && this.props.onChange(value)
  }

  handleDropdownOpen = () => this.setState({ isOpen: true })
  handleDropdownClose = () => this.setState({ isOpen: false, activeRangeEnd: null, openToDate: null })
  handleBlur = event => {
    if (document.activeElement === document.body) return
    const path = event.path || (event.composedPath ? event.composedPath() : undefined)

    if (
      path
        ? path.indexOf(document.activeElement) < 0
        : event.target !== event.currentTarget && !event.currentTarget.contains(document.activeElement)
    ) {
      this.close()
    }
  }

  close() {
    this.dropdownRef.current && this.dropdownRef.current.close()
  }

  render() {
    return (
      <Dropdown
        auto
        ref={this.dropdownRef}
        className={classnames(this.props.className, 'input-date').use(styles)}
        trigger={
          <InputDateValue
            range={this.props.range}
            value={this.displayValue}
            format={this.displayFormat}
            active={this.displayActiveRangeEnd}
            onRangeFocus={this.handleRangeFocus}
            onChange={this.handleDisplayValueChange}
          />
        }
        onOpen={this.handleDropdownOpen}
        onClose={this.handleDropdownClose}
        onBlur={this.handleBlur}
      >
        <div className={classnames('wrapper').use(styles)}>
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
