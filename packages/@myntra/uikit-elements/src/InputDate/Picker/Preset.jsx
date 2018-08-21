import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { classnames } from '@myntra/uikit-utils'

import { isDateEqual } from '../InputDateUtils'
import styles from './Preset.module.css'

/**
 A preset date selection list.

 @since 0.0.0
 @status REVIEWING
 @example
 <InputDatePicker.Preset presets={[{ label: 'Today', value: () => new Date() }]} />
 */
class Preset extends PureComponent {
  static propTypes = {
    presets: PropTypes.arrayOf(
      PropTypes.shape({
        range: PropTypes.bool,
        label: PropTypes.string.isRequired,
        /**
         * @function
         * @returns {Date|{ from: Date, to: Date }}
         */
        value: PropTypes.func.isRequired
      })
    ).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date)
      })
    ]),
    range: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  }

  handleChange = preset => {
    return this.props.onChange(this.normalize(preset.value()))
  }

  normalize(value) {
    if (this.props.range && value instanceof Date) {
      return { from: value, to: value }
    }

    return value
  }

  isActive(preset) {
    if (this.props.range) {
      const value = this.normalize(preset.value())

      return (
        this.props.value && isDateEqual(this.props.value.from, value.from) && isDateEqual(this.props.value.to, value.to)
      )
    }

    return isDateEqual(this.props.value, preset.value())
  }

  render() {
    return (
      <div className={classnames('presets').use(styles)}>
        {this.props.presets
          .filter(preset => preset.range === undefined || preset.range === this.props.range)
          .map(preset => (
            <div
              key={preset.label}
              onClick={() => this.handleChange(preset)}
              className={classnames('preset', { active: this.isActive(preset) }).use(styles)}
            >
              {preset.label}
            </div>
          ))}
      </div>
    )
  }
}

export default Preset
