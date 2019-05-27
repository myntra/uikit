import React from 'react'
import Button, { Props as ButtonProps } from '@myntra/uikit-component-button'

import classnames from './form-action.module.scss'

export interface Props extends ButtonProps {}

/**
 * @since 0.3.0
 * @status EXPERIMENTAL
 */
export default function FormAction(props) {
  return (
    <Button
      {...props}
      type={props.type || 'secondary'}
      className={classnames('action', props.type)}
      htmlType={
        props.type === 'primary' && !props.htmlType ? 'submit' : 'button'
      }
    />
  )
}
