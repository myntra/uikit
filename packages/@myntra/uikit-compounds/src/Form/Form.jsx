import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import Grid from '@myntra/uikit-compounds/src/Grid/Grid'
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
  InputTextArea
} from '@myntra/uikit-elements'

import { sizes } from '../Grid/GridColumn'

import styles from './Form.module.css'
import FormGroup, { withFormGroup } from './FormGroup'
import FormHelpText from './FormHelpText'
import FormAction from './FormAction'

/**
 * The Form component
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @example
 * <Form onSubmit={() => console.log(this.state) }>
 *  <Form.Text label="Name" value={this.state.name} onChange={name => this.setState({ name })} description="Your full name" />

  <Form.Text
    label="Email"
    type="email"
    value={this.state.email}
    onChange={email => this.setState({ email })}
    description="Your email address"
  />

  <Form.Action label="Search" type="primary" />
  <Form.Action label="Clear" onClick={() => this.setState({ name: '', email: '' })} />
 </Form>
 */
function Form({ className, children, title, defaultFieldSize, onSubmit, ...props }) {
  return (
    <form
      {...props}
      className={classnames('form', className).use(styles)}
      onSubmit={event => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      {title && <div className={classnames('form-title').use(styles)}>{title}</div>}
      <Grid multiline>
        {React.Children.map(children, field => {
          return (
            field.type !== Form.Action && (
              <Grid.Column size={field.props.fieldSize || defaultFieldSize}>{field}</Grid.Column>
            )
          )
        })}
      </Grid>
      <div className={classnames('form-actions').use(styles)}>
        {React.Children.map(children, field => field.type === FormAction && field)}
      </div>
    </form>
  )
}

Form.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** @private */
  _validate({ children }) {
    let count = 0
    React.Children.forEach(children, child => {
      if (child.type === Form.Action && child.props.type === 'primary') {
        count++
      }
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
Form.Group = FormGroup
Form.Help = FormHelpText

Form.Text = withFormGroup(InputText)
Form.Select = withFormGroup(InputSelect)
Form.CheckBox = withFormGroup(InputCheckBox)
Form.Date = withFormGroup(InputDate)
Form.Masked = withFormGroup(InputMasked)
Form.Number = withFormGroup(InputNumber)
Form.Range = withFormGroup(InputRange)
Form.Switch = withFormGroup(InputSwitch)
Form.TextArea = withFormGroup(InputTextArea)

export default Form
