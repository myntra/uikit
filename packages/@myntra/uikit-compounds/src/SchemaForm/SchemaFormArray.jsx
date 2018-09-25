import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { onlyExtraProps } from '@myntra/uikit-utils'
import { Grid, Form } from '..'
import SchemaFormField from './SchemaFormField'

/**
 * Describe component in 150-200 words.
 *
 * @since {version}
 * @status EXPERIMENTAL
 */
class SchemaFormArray extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
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

  forwardedProps = onlyExtraProps(SchemaFormArray.propTypes)

  get values() {
    return Array.isArray(this.props.value) ? this.props.value : []
  }

  get errors() {
    return Array.isArray(this.props.error) ? this.props.error : []
  }

  handleFieldChange = index => value => {
    const values = this.values.slice()

    values[index] = value

    this.props.onChange(values)
  }

  handleFieldError = index => () => {
    const errors = this.errors.slice()

    delete errors[index]

    this.props.onError(errors)
  }

  render() {
    const values = this.values
    const errors = this.errors
    const [field] = this.props.children

    return (
      <Form.Group
        {...this.forwardedProps(this.props)}
        Field={props => (
          <Grid multiline style={{ marginTop: '4px' }}>
            {(values.length ? values : [null]).map((value, index) => (
              <Grid.Column key={index} {...field.props}>
                <SchemaFormField
                  {...field}
                  value={value}
                  error={errors[index]}
                  onChange={this.handleFieldChange(index)}
                  onError={this.handleFieldError(index)}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      />
    )
  }
}

export default SchemaFormArray
