import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import { sizes } from '../Grid/GridColumn'

import FormHelpText from './FormHelpText'
import styles from './FormGroup.module.css'

/**
 * Form field wrapper component.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @example
 * <Form.Group Field={InputText} label="Name" description="Your full name" value={this.state.name} onChange={name => this.setState({ name })} />
 */
function FormGroup({ label, error, description, Field, fieldSize, ...props }) {
  return (
    <div className={classnames('form-group').use(styles)}>
      <label>
        <div className={classnames('label').use(styles)}>{label}</div>
        <Field {...props} />
        {description && <FormHelpText>{description}</FormHelpText>}
        {error && <FormHelpText type="error">{error}</FormHelpText>}
      </label>
    </div>
  )
}

FormGroup.propTypes = {
  /** Title */
  label: PropTypes.string,
  /** Description */
  description: PropTypes.string,
  /** Error message */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** Component */
  Field: PropTypes.func,
  /** When used in `<Form>`, controls width */
  fieldSize: PropTypes.oneOf(sizes)
}

export default FormGroup

export function withFormGroup(Field) {
  return props => <FormGroup {...props} Field={Field} /> // eslint-disable-line react/display-name
}
