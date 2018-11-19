import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form } from '..'
import wrappers from './wrappers.js'
import { looseEquals } from '@myntra/uikit-utils'

/**
 * Describe component in 150-200 words.
 *
 * @since {version}
 * @status EXPERIMENTAL
 */
class SchemaFormArray extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['array']).isRequired,

    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    factory: PropTypes.func.isRequired,
    component: PropTypes.func,
    props: PropTypes.object,
    layout: PropTypes.object,
    getDerivedPropsFromValue: PropTypes.func,
    // -- Handle Value & Error --
    value: PropTypes.any,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  static defaultProps = {
    getDerivedPropsFromValue() {},
    component({ children, ...props }) {
      return <Form.Group {...props} Field={() => children} />
    }
  }

  constructor(props) {
    super(props)
    this.handlers = {
      change: [],
      error: []
    }
  }

  get value() {
    return Array.isArray(this.props.value) && this.props.value.length ? this.props.value : [undefined]
  }

  shouldComponentUpdate(newProps) {
    return !(looseEquals(this.props.value, newProps.value) && looseEquals(this.props.error, newProps.error))
  }

  componentDidUpdate({ value }) {
    if (!Array.isArray(value)) return

    this.handlers.change.splice(value.length)
    this.handlers.error.splice(value.length)
  }

  getHandler(type, index) {
    if (this.handlers[type].length <= index) {
      this.handlers[type][index] = value => {
        const copiedValue = (this.props.value || []).slice()

        copiedValue.splice(index, 1, value)

        return copiedValue
      }
    }

    return this.handlers[type][index]
  }

  getChangeHandler(index) {
    return this.getHandler('change', index)
  }

  getErrorHandler(index) {
    return this.getHandler('error', index)
  }

  getError(index) {
    if (!Array.isArray(this.props.error)) return

    return this.props.error[index]
  }

  render() {
    const Wrapper = this.props.component
    const { props, layout, value } = this.props
    const { defaultValue, ...newProps } = { ...props, ...this.props.getDerivedPropsFromValue(value) }

    if (value === undefined || value === null) {
      // TODO: Add array handler.
    }

    return (
      <Grid.Column {...layout}>
        <Wrapper {...newProps}>
          <Grid multiline allowAnyChild>
            {this.value.map((value, index) => {
              const { type, ...ui } = this.props.factory(index)
              const Input = wrappers[type]

              return (
                <Input
                  key={index}
                  {...ui}
                  path={`${this.props.path}/${index}`}
                  type={type}
                  value={value}
                  onChange={this.getChangeHandler(index)}
                  error={this.getError(index)}
                  onError={this.getErrorHandler(index)}
                />
              )
            })}
          </Grid>
        </Wrapper>
      </Grid.Column>
    )
  }
}

export default SchemaFormArray
