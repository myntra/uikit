import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class SchemaFormField extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    children: PropTypes.array,
    props: PropTypes.object,
    // -- Handle Value & Error --
    value: PropTypes.any,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  get error() {
    return Array.isArray(this.props.error) ? this.props.error.join(' ') : this.props.error
  }

  resetError() {
    if (this.props.error) this.props.onError(null)
  }

  handleChange = (...args) => {
    this.resetError()
    this.props.onChange(...args)
  }

  handleBlur = () => {
    this.resetError()
  }

  render() {
    const { component: Component, props, ...rest } = this.props

    return <Component {...props} {...rest} error={this.error} onChange={this.handleChange} onBlur={this.handleBlur} />
  }
}
