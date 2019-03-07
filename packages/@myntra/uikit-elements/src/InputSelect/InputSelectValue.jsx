import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { memoize } from '@myntra/uikit-utils'

import classnames from './InputSelectValue.module.css'

export default class InputSelectValue extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    underlay: PropTypes.bool,
    optionsForValues: PropTypes.array,
    labelKey: PropTypes.string
  }

  computeValue = memoize(({ optionsForValues, labelKey }) => {
    if (optionsForValues.length === 0) return ''

    // TODO: Calculate number of visible characters.
    return optionsForValues.length === 1
      ? optionsForValues[0][labelKey]
      : `${optionsForValues[0][labelKey]}, + ${optionsForValues.length - 1} more`
  })

  get value() {
    return this.computeValue(this.props)
  }

  render() {
    const { disabled, underlay } = this.props

    return (
      <div className={classnames({ underlay }, 'value')} title={this.value}>
        <input className={classnames('input')} disabled={disabled} value={this.value} tabIndex={-1} readOnly />
      </div>
    )
  }
}
