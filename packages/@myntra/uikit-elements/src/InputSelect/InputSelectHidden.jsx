import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { toString } from './helpers'

export default class InputSelectHidden extends PureComponent {
  static propTypes = {
    values: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    name: PropTypes.string
  }

  render() {
    return (
      <select
        name={this.props.name}
        hidden
        readOnly
        multiple={this.props.values.length > 1}
        value={this.props.values.length > 1 ? this.props.values : this.props.values[0]}
      >
        {this.props.values.map(value => <option key={value} value={toString(value)} />)}
      </select>
    )
  }
}
