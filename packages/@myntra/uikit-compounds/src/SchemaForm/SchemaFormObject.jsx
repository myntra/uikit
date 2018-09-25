import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '..'
import SchemaFormField from './SchemaFormField'

/**
 * Describe component in 150-200 words.
 *
 * @since {version}
 * @status EXPERIMENTAL
 */
class SchemaFormObject extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    dependencies: PropTypes.func,
    children: PropTypes.array.isRequired,
    props: PropTypes.object,
    // -- Handle Value & Error --
    value: PropTypes.any,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handlers = {}
  }

  handleFieldChange = name =>
    this.handlers[name] || (this.handlers[name] = value => this.props.onChange({ ...this.props.value, [name]: value }))

  handleFieldError = name =>
    this.handlers[name + '$$'] ||
    (this.handlers[name + '$$'] = value => this.props.onError({ ...this.props.value, [name]: undefined }))

  render() {
    const dependencies = this.props.dependencies ? this.props.dependencies(this.props.value) : {}
    const value = this.props.value || {}
    const error = this.props.error || {}

    return (
      <Grid {...this.props.props} multiline>
        {this.props.children.map(field => (
          <Grid.Column key={field.name} size={field.props.fieldSize}>
            <SchemaFormField
              {...field}
              {...dependencies[field.name]}
              value={field.name in value ? value[field.name] : null}
              error={error[field.name]}
              onChange={this.handleFieldChange(field.name)}
              onError={this.handleFieldError(field.name)}
            />
          </Grid.Column>
        ))}
      </Grid>
    )
  }
}

export default SchemaFormObject
