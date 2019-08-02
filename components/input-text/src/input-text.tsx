import React from 'react'
import classnames from './input-text.module.scss'
import Icon, { IconName } from '@myntra/uikit-component-icon'

export interface Props extends BaseProps {
  /** Sets the text format for the field. */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search'
  /** Current value of the text input field. */
  value?: string
  /** The handler to call when the value changes. */
  onChange?(value: string): void
  /** Displays a disabled text field */
  disabled?: boolean
  /** Displays a readonly text field */
  readOnly?: boolean
  /** Displays the icon as prefix */
  icon?: IconName
}

/**
 * A component to input text-like data (email, tel, text, password and url).
 *
 * @since 0.0.0
 * @status READY
 * @category input
 * @see http://uikit.myntra.com/components/input-text
 */
export default function InputText({
  className,
  onChange,
  value,
  readOnly,
  icon,
  ...props
}: Props) {
  readOnly = readOnly || !onChange

  return (
    <div className={classnames('container', className)}>
      {icon && <Icon className={classnames('icon')} name={icon} />}
      <input
        {...props}
        readOnly={readOnly}
        value={typeof value !== 'string' ? '' : value}
        onChange={readOnly ? null : (event) => onChange(event.target.value)}
        className={classnames('input', { 'with-icon': !!icon })}
      />
    </div>
  )
}

InputText.defaultProps = {
  type: 'text',
}
