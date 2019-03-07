import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, InputMasked } from '../index'
import InputMonthPicker from './InputMonthPicker'
import { format, parse } from '../InputDate/InputDateUtils'
import classnames from './InputMonthPicker.module.css'

const MASKS = {
  Y: {
    validate(char, text) {
      return /\d/.test(char)
    }
  },
  M: {
    validate(char, text) {
      return /\w/.test(char)
    }
  }
}

/**
 * Month selection utility.
 *
 * @since 0.7.0
 * @status EXPERIMENTAL
 * @example
 * <InputMonth value={this.state.value || { month: 2, year: 2019 }} onChange={value => this.setState({ value })}  />
 */
class InputMonth extends Component {
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

  static defaultProps = {
    format: 'MMM/yyyy'
  }

  state = {
    isOpen: false,
    valueAsString: ''
  }

  componentDidMount() {
    this.updateLocalValue()
  }

  componentDidUpdate(oldProps) {
    if (oldProps.value !== this.props.value) {
      this.updateLocalValue()
    }
  }

  updateLocalValue() {
    if (this.props.value.month && this.props.value.year) {
      const valueAsString = format(new Date(this.props.value.year, this.props.value.month - 1), this.props.format)
      if (this.state.valueAsString !== valueAsString) {
        this.setState({
          valueAsString
        })
      }
    } else {
      this.setState({
        valueAsString: ''
      })
    }
  }

  get pattern() {
    return this.props.format.toUpperCase().replace(/[^YM]+/g, match => `"${match}"`)
  }

  handleStringValueChange = valueAsString => {
    try {
      const date = parse(valueAsString, this.props.format, new Date())
      if (date && format(date, this.props.format) !== valueAsString) throw new Error('Not matching')
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      this.props.onChange && this.props.onChange({ year, month })
    } catch (e) {
      this.setState({ valueAsString })
    }
  }

  handleDropdownOpen = () => this.setState({ isOpen: true })
  handleDropdownClose = () => this.setState({ isOpen: false })

  handleMonthChange = ({ month, year }) => {
    this.props.onChange && this.props.onChange({ month, year })
    this.handleDropdownClose()
  }

  closeDelayed = () => {
    this.updateLocalValue()
    setTimeout(this.handleDropdownClose, 150)
  }

  render() {
    return (
      <Dropdown
        auto
        container
        trigger={
          <InputMasked
            value={this.state.valueAsString}
            onChange={this.handleStringValueChange}
            pattern={this.pattern}
            masks={MASKS}
            includeMaskChars
            onBlur={this.closeDelayed}
          />
        }
        isOpen={this.state.isOpen}
        onOpen={this.handleDropdownOpen}
        onClose={this.handleDropdownClose}
      >
        <div>
          <InputMonthPicker
            {...this.props}
            className={classnames('wrapper')}
            onChange={this.handleMonthChange}
            renderMonth={month => month.substr(0, 3)}
          />
        </div>
      </Dropdown>
    )
  }
}
export default InputMonth
