import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, InputMasked } from '..'
import InputMonthPicker from './InputMonthPicker'

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

  state = {
    valueAsString: null
  }

  componentDidMount() {
    this.updateLocalValue()
  }

  componentDidUpdate() {
    this.updateLocalValue()
  }

  updateLocalValue() {
    if (this.props.year && this.props.month) {
      const valueAsString = `${this.props.year}/` + `${this.props.month}`.padStart(2, '0')

      if (this.state.valueAsString !== valueAsString) this.setState({ valueAsString })
    }
  }

  onStringValueChange = valueAsString => {
    const match = /^(\d{4})\/(\d{2})$/.exec(valueAsString)

    if (match) {
      const [, year, month] = match

      this.props.onChange && this.props.onChange({ year: Number(year), month: Number(month) })
    }

    this.setState(valueAsString)
  }

  render() {
    return (
      <Dropdown trigger={<InputMasked value={this.state.valueAsString} onChange={this.onStringValueChange} />}>
        <InputMonthPicker {...this.props} />
      </Dropdown>
    )
  }
}
export default InputMonth
