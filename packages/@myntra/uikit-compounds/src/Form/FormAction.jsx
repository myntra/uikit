import React from 'react'
import { Button } from '@myntra/uikit-elements'
import classnames from './FormAction.module.css'

/**
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @example
 *
 * <Form.Action type="primary">Submit</Form.Action>
 */
function FormAction(props) {
  return (
    <Button
      {...props}
      type={props.type || 'secondary'}
      className={classnames('action', props.type)}
      htmlType={props.type === 'primary' && !props.htmlType ? 'submit' : 'button'}
    />
  )
}

FormAction.propTypes = {
  ...Button.propsTypes
}

export default FormAction
