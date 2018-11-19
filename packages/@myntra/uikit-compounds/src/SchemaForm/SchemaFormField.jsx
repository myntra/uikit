import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '..'

export default class SchemaFormField extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['field']).isRequired,

    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    props: PropTypes.object,
    layout: PropTypes.object,
    getDerivedPropsFromValue: PropTypes.func,
    // -- Handle Value & Error --
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  static defaultProps = {
    getDerivedPropsFromValue() {}
  }

  constructor(options) {
    super(options)

    const { props } = options

    if (options.value === undefined) {
      if ('value' in props) this.handleChange(props.value)
      if ('default' in props) this.handleChange(props.default)
    }
  }

  get error() {
    return Array.isArray(this.props.error) ? this.props.error.join(' ') : this.props.error
  }

  shouldComponentUpdate(newProps) {
    return (
      this.props.value !== newProps.value ||
      this.props.error !== newProps.error ||
      this.props.defaultValue !== newProps.defaultValue
    )
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
    const { name, props, layout, getDerivedPropsFromValue, value } = this.props
    const Input = this.props.component
    const { defaultValue, ...newProps } = { ...props, ...getDerivedPropsFromValue(value, this.props.path) }
    const newDefaultValue = this.props.defaultValue === undefined ? defaultValue : this.props.defaultValue

    if ((value === undefined || value === null) && newDefaultValue !== undefined) {
      setTimeout(() => this.props.onChange(newDefaultValue), 0)
    }

    return (
      <Grid.Column {...layout}>
        <Input
          {...newProps}
          data-props={newProps}
          name={name}
          value={value}
          onChange={this.handleChange}
          error={this.error}
          onBlur={this.handleBlur}
        />
      </Grid.Column>
    )
  }
}
