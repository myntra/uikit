import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './InputDate.css'
import Picker from './Picker'
import dayjs from 'dayjs'
import { presetList } from './constants'

function toString(any) {
  return any === undefined || any === null ? '' : `${any}`
}

/**
 The InputDate component.

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <InputDate range value={this.state.value} onChange={(value) => {console.log(value); this.setState({value})}}/>
**/

export default class InputDate extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disabledDates: Picker.propTypes.disabled,
    format: PropTypes.string,
    id: PropTypes.string,
    range: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date)
      })
    ]),
    presets: PropTypes.array,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date)
  }

  static defaultProps = {
    disabled: false,
    format: 'DD-MM-YYYY',
    range: false,
    placeholder: 'Select...',
    required: false,
    presets: [
      presetList.TODAY,
      presetList.YESTERDAY,
      presetList.LAST_7_DAYS,
      presetList.LAST_15_DAYS,
      presetList.LAST_30_DAYS,
      presetList.LAST_45_DAYS,
      presetList.LAST_90_DAYS,
      presetList.LAST_WEEK,
      presetList.LAST_MONTH,
      presetList.LAST_3_MONTHS,
      presetList.LAST_6_MONTHS
    ]
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      prefix: `select-${Date.now()}`
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  get value() {
    if (!this.props.value) return ''
    const f = d => dayjs(d).format(this.props.format)

    if (!this.props.range) {
      return f(this.props.value)
    }
    if (this.props.value.from && this.props.value.to) {
      return `${f(this.props.value.from)} to ${f(this.props.value.to)}`
    }
    if (this.props.value.from) {
      return `After ${f(this.props.value.from)}`
    }
    if (this.props.value.to) {
      return `Before ${f(this.props.value.to)}`
    }
    return ''

    // return this.props.value
  }

  openMenu() {
    if (!this.props.disabled && !this.state.isOpen) {
      this.focus()
      this.setState({ isOpen: true }, this.props.onOpen)
    }
  }

  closeMenu() {
    this.setState({ isOpen: false, value: '' }, this.props.onClose)
  }

  focus() {
    if (this.input) this.input.focus()
  }

  handleMouseDown = event => {
    if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) return

    event.preventDefault()

    if (!this.state.isOpen) {
      this.openMenu()
    }
  }

  handleKeyDown = event => {
    switch (event.keyCode) {
      case 27: // escape
        event.preventDefault()
        if (this.state.isOpen) {
          this.closeMenu()
          event.stopPropagation()
        }
        break
      default:
        break
    }
  }

  onChange = value => {
    this.props.onChange(value)
  }

  handleChange = value => {
    this.onChange(value)
    if (this.props.range) {
      if (value && value.from && value.to) this.closeMenu()
    } else if (value) this.closeMenu()
  }

  handleBlur = () => {
    if (this.wrapper && (this.wrapper === document.activeElement || this.wrapper.contains(document.activeElement))) {
      this.focus() // don't loose focus.

      return
    }

    if (this.keepOpen) {
      this.keepOpen = false
      this.focus() // don't loose focus.

      return
    }

    this.closeMenu()
  }

  handleSelectorFocus = () => {
    this.keepOpen = true
  }

  handleOutsideClick = event => {
    // close date picker layover if user clicks outside
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.closeMenu()
    }
  }

  renderInput() {
    const value = this.value

    return (
      <input
        id={this.props.id}
        className={styles.datepickerInput}
        disabled={this.props.disabled}
        ref={ref => {
          this.input = ref
        }}
        role="combobox"
        value={value}
        placeholder={this.props.placeholder}
        autoComplete="off"
        onBlur={this.handleBlur}
        aria-haspopup={toString(this.state.isOpen)}
        aria-expanded={toString(this.state.isOpen)}
        aria-autocomplete="both"
        aria-activedescendant={`${this.state.prefix}-option-${this.state.focusedIndex}`}
        aria-controls={`${this.state.prefix}-picker`}
        aria-owns={`${this.state.prefix}-picker`}
      />
    )
  }

  renderSelector() {
    const self = this.wrapper.getBoundingClientRect()
    const maxWidth = window.innerWidth
    const style = {}
    const { presets, minDate, maxDate } = this.props

    if (self.left + 500 < maxWidth) {
      style.left = 0
    } else {
      style.right = 0
    }

    return (
      <div
        id={`${this.state.prefix}-picker`}
        className={styles.datepickerWrapper}
        onMouseDown={this.handleSelectorFocus}
        style={style}
        role="listbox"
      >
        <Picker
          displayMonthsForRange={2}
          disabled={this.props.disabledDates}
          range={this.props.range}
          value={this.props.value}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          presets={presets}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    )
  }

  renderRemoveIcon() {
    if (this.props.disabled || !this.props.value) return null

    return (
      <span
        onMouseDown={event => {
          event.preventDefault()
          event.stopPropagation()
          this.handleChange(null)
        }}
      >
        {/* <CloseIcon width="8px" height="8px" /> */}
        X
      </span>
    )
  }

  render() {
    const className = classnames('datepicker', this.props.className, {
      range: this.props.range,
      disabled: this.props.disabled
    }).use(styles)

    return (
      <div
        ref={ref => {
          this.wrapper = ref
        }}
        className={className}
      >
        <div
          className={classnames('datepickerControl', {
            datepickerControlFocus: this.state.isOpen
          }).use(styles)}
          onKeyDown={this.handleKeyDown}
          onClick={this.handleMouseDown}
          onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleTouchStart}
        >
          {this.renderInput()}
          {this.renderRemoveIcon()}
        </div>
        {this.state.isOpen && this.renderSelector()}
      </div>
    )
  }
}
