import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { toString } from './helpers'

export default class InputHidden extends PureComponent {
  static propTypes = {
    values: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    name: PropTypes.string
  }

  render() {
    return this.props.values.map(value => (
      <input disabled={this.props.disabled} name={this.props.name} type="hidden" key={value} value={toString(value)} />
    ))
  }
}
