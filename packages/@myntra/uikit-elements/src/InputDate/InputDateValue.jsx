import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import { InputMasked } from '../'

import styles from './InputDateValue.css'
import { parse } from './InputDateUtils'
import Icon from '../Icon/Icon'

const MASKS = {
  Y: {
    validate(char, text) {
      return /\d/.test(char)
    }
  },
  M: {
    validate(char, text) {
      return /\d/.test(char)
    }
  },
  D: {
    validate(char, text) {
      return /\d/.test(char)
    }
  }
}

/**
 {describe component}

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <InputDate.Value />
 */
class InputDateValue extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    range: PropTypes.bool,
    active: PropTypes.oneOf(['from', 'to']),
    ignoreBlur: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string
      })
    ]),
    format: PropTypes.string.isRequired,
    /**
     * @function
     * @param {string|{from?: string, to?: string}} value
     */
    onChange: PropTypes.func.isRequired,
    onRangeFocus: PropTypes.func,
    onFocus: PropTypes.func
  }

  state = { value: null }

  get value() {
    return this.state.value ? this.state.value : this.props.value
  }

  get pattern() {
    return this.props.format.toUpperCase().replace(/[^YMD]+/g, match => `"${match}"`)
  }

  handleChange = value => {
    try {
      const date = parse(value, this.props.format)

      this.setState({ value: null })
      this.props.onChange(date)
    } catch (e) {
      this.setState({ value })
    }
  }

  handleFromChange = value => {
    try {
      const date = parse(value, this.props.format)

      this.setState({ value: null })
      this.props.onChange({ from: date })
    } catch (e) {
      this.setState({ value: { from: value, to: this.value.to } })
    }
  }

  handleToChange = value => {
    try {
      const date = parse(value, this.props.format)

      this.setState({ value: null })
      this.props.onChange({ to: date })
    } catch (e) {
      this.setState({ value: { from: this.value.from, to: value } })
    }
  }

  /**
   * @public
   */
  handleBlur = () => {
    this.setState({ value: null })
  }

  handleFromFocus = () => {
    this.handleRangeFocus('from')
  }

  handleToFocus = () => {
    this.handleRangeFocus('to')
  }

  handleRangeFocus = value => {
    this.props.onRangeFocus && this.props.onRangeFocus(value)
    this.props.onFocus && this.props.onFocus()
  }

  handleFromClear = () => {
    this.setState({ value: null })
    this.props.onChange && this.props.onChange({ from: null })
  }

  handleToClear = () => {
    this.setState({ value: null })
    this.props.onChange && this.props.onChange({ to: null })
  }

  handleClear = () => {
    this.setState({ value: null })
    this.props.onChange && this.props.onChange(null)
  }

  render() {
    const props = {
      onBlur: this.handleBlur,
      onFocus: this.props.onFocus,
      masks: MASKS,
      pattern: this.pattern,
      includeMaskChars: true
    }

    return (
      <div className={classnames('date-value').use(styles)}>
        {this.props.range && (
          <div key="from" className={classnames('wrapper').use(styles)}>
            <InputMasked
              {...props}
              className={classnames({ active: this.props.active === 'from' }).use(styles)}
              value={this.value.from}
              onClick={this.handleFromFocus}
              onFocus={this.handleFromFocus}
              onChange={this.handleFromChange}
            />
            {this.props.value.from && (
              <Icon
                className={classnames('icon').use(styles)}
                name="cross"
                title="Clear date"
                onClick={this.handleFromClear}
              />
            )}
          </div>
        )}
        {this.props.range && (
          <div key="to" className={classnames('wrapper').use(styles)}>
            <InputMasked
              {...props}
              className={classnames({ active: this.props.active === 'to' }).use(styles)}
              value={this.value.to}
              onClick={this.handleToFocus}
              onFocus={this.handleToFocus}
              onChange={this.handleToChange}
            />
            {this.props.value.to && (
              <Icon
                className={classnames('icon').use(styles)}
                name="cross"
                title="Clear date"
                onClick={this.handleToClear}
              />
            )}
          </div>
        )}
        {!this.props.range && (
          <div key="both" className={classnames('wrapper').use(styles)}>
            <InputMasked {...props} value={this.value} onChange={this.handleChange} />
            {this.props.value && (
              <Icon
                className={classnames('icon').use(styles)}
                name="cross"
                title="Clear date"
                onClick={this.handleClear}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}

export default InputDateValue
