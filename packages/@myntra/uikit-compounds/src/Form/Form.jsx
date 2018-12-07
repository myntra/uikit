import React, { Children } from 'react'
import { Grid } from '../index'
import PropTypes from 'prop-types'
import {
  InputText,
  InputSelect,
  InputCheckBox,
  InputDate,
  InputMasked,
  InputNumber,
  InputRange,
  InputSwitch,
  InputTextArea,
  Field,
  withField
} from '@myntra/uikit-elements'

import { sizes } from '../Grid/GridColumn'

import classnames from './Form.module.css'
import FormHelpText from './FormHelpText'
import FormAction from './FormAction'

/**
 * The Form component
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @example
<Form onSubmit={() => console.log(this.state)}>
  <Form.Text
    label="Name"
    value={this.state.name}
    onChange={name => this.setState({ name })}
    description="Your full name"
  />

  <Form.Select
    label="Gender"
    options={[{ value: 1, label: 'Female' }, { value: 2, label: 'Male' }, { value: 3, label: 'Other' }]}
    value={this.state.gender}
    onChange={gender => this.setState({ gender })}
    description="Gender"
  />

  <Form.Date
    range
    label="Date of Birth"
    value={this.state.date}
    onChange={date => this.setState({ date })}
    description="Your date of birth"
  />

  <Form.Action label="Search" type="primary" />
  <Form.Action
    label="Clear"
    onClick={() => this.setState({ name: '', email: '' })}
  />
</Form>
 */
function Form({ children, title, defaultFieldSize, onSubmit, ...props }) {
  const fields = []
  const actions = []

  Children.map(children, child => {
    if (!child) return
    if (child.type !== FormAction) fields.push(child)
    else actions.push(child)
  })

  return (
    <form
      {...props}
      onSubmit={event => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      {title && <div className={classnames('form-title')}>{title}</div>}
      <Grid multiline>
        {fields.map((field, index) => (
          <Grid.Column key={index} size={(field.props && field.props.fieldSize) || defaultFieldSize}>
            {field}
          </Grid.Column>
        ))}
      </Grid>
      <div className={classnames('form-actions')}>{actions}</div>
    </form>
  )
}

Form.propTypes = {
  /** @private */
  _validate({ children }) {
    let count = 0
    React.Children.forEach(children, child => {
      if (child && child.type === Form.Action && child.props.type === 'primary') count++
    })

    if (count > 1) {
      throw new Error('Form should contain only one primary action.')
    }
  },
  /** Title/heading */
  title: PropTypes.string,
  /** Form fields */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  /** Width of each field */
  defaultFieldSize: PropTypes.oneOf(sizes),
  /** Event fired on form submission */
  onSubmit: PropTypes.func.isRequired
}

Form.Action = FormAction
Form.Field = Field
Form.Help = FormHelpText

Form.Text = withField(InputText)
Form.Select = withField(InputSelect)
Form.CheckBox = withField(InputCheckBox)
Form.Date = withField(InputDate)
Form.Masked = withField(InputMasked)
Form.Number = withField(InputNumber)
Form.Range = withField(InputRange)
Form.Switch = withField(InputSwitch)
Form.TextArea = withField(InputTextArea)

export default Form
