import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '..'
import wrappers from './wrappers'
import { looseEquals } from '@myntra/uikit-utils'

/**
 * Describe component in 150-200 words.
 *
 * @since {version}
 * @status EXPERIMENTAL
 */
class SchemaFormObject extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['object']).isRequired,

    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    component: PropTypes.any,
    props: PropTypes.object,
    layout: PropTypes.object,
    children: PropTypes.array.isRequired,
    getDerivedPropsFromValue: PropTypes.func,

    // -- Handle Value & Error --
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  static defaultProps = {
    path: '#',
    getDerivedPropsFromValue() {
      // do nothing
    },
    component({ children }) {
      return React.Children.only(children)
    }
  }

  constructor(props) {
    super(props)
    this.handlers = {
      change: {},
      error: {}
    }
  }

  shouldComponentUpdate(newProps) {
    return !(looseEquals(this.props.value, newProps.value) && looseEquals(this.props.error, newProps.error))
  }

  getValue(name) {
    if (this.props.value && name in this.props.value) {
      return this.props.value[name]
    }
  }

  getHandler(type, name) {
    if (!(name in this.handlers[type])) {
      this.handlers[type][name] = value => this.props.onChange({ ...this.props.value, [name]: value })
    }

    return this.handlers[type][name]
  }

  getChangeHandler(name) {
    return this.getHandler('change', name)
  }

  getError(name) {
    if (this.props.error && name in this.props.error) {
      return this.props.error[name]
    }
  }

  getErrorHandler(name) {
    return this.getHandler('error', name)
  }

  render() {
    const { props, layout } = this.props
    const Wrapper = this.props.component
    const { properties: derivedProps = {} } =
      this.props.getDerivedPropsFromValue(this.props.value, this.props.path) || {}

    return (
      <Grid.Column {...layout}>
        <Wrapper {...props}>
          <Grid multiline allowAnyChild>
            {this.props.children.map(({ type, name, ...ui }) => {
              const Input = wrappers[type]

              return (
                <Input
                  {...ui}
                  {...props[name]}
                  {...derivedProps[name]}
                  path={`${this.props.path}/${name}`}
                  key={name}
                  name={name}
                  type={type}
                  value={this.getValue(name)}
                  error={this.getError(name)}
                  onChange={this.getChangeHandler(name)}
                  onError={this.getErrorHandler(name)}
                />
              )
            })}
          </Grid>
        </Wrapper>
      </Grid.Column>
    )
  }
}

export default SchemaFormObject
