import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '../index'
import wrappers from './wrappers'
import { looseEquals } from '@myntra/uikit-utils'
import { Button, Field } from '@myntra/uikit-elements'
import classnames from './SchemaFormArray.module.css'

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
    component: Field
  }

  constructor(props) {
    super(props)
    this.handlers = {
      change: [],
      error: []
    }
  }

  get value() {
    return Array.isArray(this.props.value) ? this.props.value : [undefined]
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

  add = () => {
    const value = (this.props.value || []).slice()

    value.push(undefined)

    if (!this.props.value) value.push(undefined)

    this.props.onChange(value)
  }

  remove = index => {
    const value = (this.props.value || []).slice()

    value.splice(index, 1)

    this.props.onChange(value)
  }

  render() {
    const Wrapper = this.props.component
    const { props, layout, value } = this.props
    const { defaultValue, ...newProps } = { ...props, ...this.props.getDerivedPropsFromValue(value) }

    return (
      <Grid.Column {...layout} className={classnames('container')}>
        <Wrapper {...newProps}>
          <Grid multiline className={classnames('items')}>
            {this.value.map((value, index) => {
              const { type, ...ui } = this.props.factory(index)
              const Input = wrappers[type]

              return (
                <Grid.Column size={12} key={index}>
                  <Grid multiline allowAnyChild>
                    <Input
                      {...ui}
                      path={`${this.props.path}/${index}`}
                      type={type}
                      value={value}
                      onChange={this.getChangeHandler(index)}
                      error={this.getError(index)}
                      onError={this.getErrorHandler(index)}
                    />
                  </Grid>
                  <div className={classnames('remove-item')}>
                    <Button onClick={() => this.remove(index)} type="secondary">
                      Remove
                    </Button>
                  </div>
                </Grid.Column>
              )
            })}
          </Grid>
        </Wrapper>

        <div className={classnames('add-item')}>
          <Button onClick={this.add} type="secondary">
            Add
          </Button>
        </div>
      </Grid.Column>
    )
  }
}

export default SchemaFormArray
