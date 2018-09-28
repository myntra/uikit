import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import styles from './InputDateValue.module.css'
import { parse, format } from './InputDateUtils'
import { Icon, InputMasked } from '../index.js'

export const MASKS = {
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
 @status REVIEWING
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
    return this.state.value ? this.state.value : this.props.range ? this.props.value || {} : this.props.value
  }

  get pattern() {
    return this.props.format.toUpperCase().replace(/[^YMD]+/g, match => `"${match}"`)
  }

  handleFromChange = value => this.handleChange(value, 'from')
  handleToChange = value => this.handleChange(value, 'to')
  handleChange = (value, key) => {
    try {
      const date = parse(value, this.props.format)

      if (date && format(date, this.props.format) !== value) throw new Error('not matching')

      this.setState({ value: null })
      this.props.onChange(typeof key === 'string' ? { [key]: date } : date)
    } catch (e) {
      if (key) {
        value = { ...this.value, [key]: value }
      }

      this.setState({ value })
    }
  }

  /**
   * @public
   */
  handleBlur = () => this.setState({ value: null })
  handleFromFocus = () => this.handleRangeFocus('from')
  handleToFocus = () => this.handleRangeFocus('to')
  handleRangeFocus = value => {
    this.props.onRangeFocus && this.props.onRangeFocus(value)
    this.props.onFocus && this.props.onFocus()
  }

  handleFromClear = () => this.handleClear('from')
  handleToClear = () => this.handleClear('to')
  handleClear = key => {
    this.setState({ value: null })
    this.props.onChange && this.props.onChange(typeof key === 'string' ? { [key]: null } : null)
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
      <div className={classnames('date-value', { 'date-value-active': this.props.active }).use(styles)}>
        {this.props.range && (
          <div key="from" className={classnames('wrapper', { active: this.props.active === 'from' }).use(styles)}>
            <InputMasked
              {...props}
              value={this.value.from}
              onClick={this.handleFromFocus}
              onFocus={this.handleFromFocus}
              onChange={this.handleFromChange}
            />
            {this.props.value &&
              this.props.value.from && (
                <Icon
                  className={classnames('icon').use(styles)}
                  name="times"
                  title="Clear date"
                  onClick={this.handleFromClear}
                />
              )}
          </div>
        )}
        {this.props.range && (
          <div key="to" className={classnames('wrapper', { active: this.props.active === 'to' }).use(styles)}>
            <InputMasked
              {...props}
              value={this.value.to}
              onClick={this.handleToFocus}
              onFocus={this.handleToFocus}
              onChange={this.handleToChange}
            />
            {this.props.value &&
              this.props.value.to && (
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
