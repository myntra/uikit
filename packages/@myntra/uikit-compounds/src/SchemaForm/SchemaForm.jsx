import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form } from '..'
import { generateUISchema } from './SchemaFormUtils'
import wrappers from './wrappers'

const FORM_FIELD_RE = /^Form\.([A-Za-z0-9]+)$/

/**
 * A component for building Web forms from JSON Schema.
 *
 * It is meant to automatically generate a form when data structure changes often or has large number of fields.
 *
 * @since 0.3.0
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
      "description": "Your full name (type John)"
    },
    "email": {
      "type": "string",
      "title": "Email Address",
      "description": "Your personal email address",
      "format": "email"
    },
    "dob": {
      "type": "string",
      "title": "Date of Birth",
      "description": "Your date of birth",
      "format": "date"
    },
    "addresses": {
      "type": "array",
      "title": "Contact Addresses",
      "description": "Your all contact addresses",
      "layout": {
        "size": 12
      },
      "items": {
        "type": "object",
        "title": "Contact Address",
        "description": "Your contact address",
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
  ],
  "dependencies": {
    "name": {
      "if": {
        "properties": {
          "name": {
            "const": "John"
          }
        }
      },
      "then": {
        "properties": {
          "email": {
            "default": "john@example.com"
          }
        }
      }
    }
  }
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
    onError: PropTypes.func,
    /** Event fired on form submission. */
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onSubmit: () => null
  }

  constructor(props) {
    super(props)

    this.ui = generateUISchema(this.props.schema, {
      resolveComponent: this.componentProvider,
      resolveOptions: this.props.optionsProvider
    })
  }

  componentProvider = name => {
    if (FORM_FIELD_RE.test(name)) {
      return Form[name.split('.').pop()]
    }
  }

  handleError = error => this.props.onError && this.props.onError(error)
  handleChange = value => this.props.onChange && this.props.onChange(value)

  render() {
    const Wrapper = wrappers[this.ui.type]

    try {
      return (
        <Form onSubmit={this.props.onSubmit}>
          <Wrapper
            {...this.ui}
            value={this.props.value}
            error={this.props.error}
            onChange={this.handleChange}
            onError={this.handleError}
          />
          {this.props.children}
        </Form>
      )
    } catch (e) {
      return null
    }
  }
}
