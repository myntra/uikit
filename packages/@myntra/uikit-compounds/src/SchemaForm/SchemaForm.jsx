import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form } from '..'
import { memoize } from '@myntra/uikit-utils'
import { generateUISchema } from './SchemaFormUtils'
import SchemaFormObject from './SchemaFormObject'
import SchemaFormArray from './SchemaFormArray'

const FORM_FIELD_RE = /^Form\.([A-Za-z0-9]+)$/

/**
 * A component for building Web forms from JSON Schema.
 *
 * It is meant to automatically generate a form when data structure changes often or has large number of fields.
 *
 * @since v0.3.0
 * @status EXPERIMENTAL
 * @example
 *
<SchemaForm
  schema={{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Simple Form",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "Name",
      "description": "Your full name"
    },
    "email": {
      "type": "string",
      "title": "Email Address",
      "description": "Your personal email address",
      "format": "email"
    },
    "phone": {
      "type": "string",
      "title": "Phone Number",
      "description": "Your personal contact number",
      "format": "tel"
    },
    "addresses": {
      "type": "array",
      "title": "Contact Addresses",
      "description": "Your all contact addresses",
      "ui": {
        "fieldSize": 12
      },
      "items": {
        "type": "object",
        "title": "Contact Address",
        "description": "Your contact address",
        "ui": {
          "fieldSize": 12
        },
        "properties": {
          "line1": {
            "type": "string",
            "title": "House No."
          },
          "street": {
            "type": "string",
            "title": "Street"
          },
          "city": {
            "type": "string",
            "title": "City"
          }
        }
      }
    }
  },
  "required": [
    "name",
    "email"
  ]
}}
  value={this.state.value || {}}
  error={this.state.error}
  onChange={value => this.setState({ value })}
  onError={error => this.setState({ error })}
>
  <Form.Action label="Save" type="primary" />
</SchemaForm>
 */
export default class SchemaForm extends PureComponent {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.any,

    optionsProvider: PropTypes.func,
    // --
    error: PropTypes.object,
    onError: PropTypes.func
  }

  generateUISchema = memoize((schema, provider) => generateUISchema(schema, provider))

  componentProvider = name => {
    if (name === 'SchemaForm.Object') return SchemaFormObject
    if (name === 'SchemaForm.Array') return SchemaFormArray
    if (FORM_FIELD_RE.test(name)) {
      return Form[name.split('.').pop()]
    }
  }

  handleError = error => this.props.onError && this.props.onError(error)
  handleChange = value => this.props.onChange && this.props.onChange(value)

  get ui() {
    return this.generateUISchema(this.props.schema, this.componentProvider)
  }

  render() {
    const { component: Component, ...props } = this.ui

    return (
      <Form onSubmit={() => {}}>
        <Component
          {...props}
          value={this.props.value}
          error={this.props.error}
          onChange={this.handleChange}
          onError={this.handleError}
        />
        {this.props.children}
      </Form>
    )
  }
}
