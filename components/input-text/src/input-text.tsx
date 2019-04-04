import React from 'react'
import classnames from './input-text.module.scss'

interface InputTextProps extends BaseProps {
  /** Sets the text format for the field. */
  type: 'text' | 'email' | 'password' | 'tel' | 'url'
  /** Current value of the text input field. */
  value?: string
  /** The handler to call when the value changes. */
  onChange?(value: string): void
  /** Displays a disabled text field */
  disabled?: boolean
  /** Displays a readonly text field */
  readOnly?: boolean
}

/**
 * A text input component for text-like data (email, tel, text, password and url).
 *
 * @since 0.0.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/input-text
 */
export default function InputText({
  className,
  onChange,
  value,
  readOnly,
  ...props
}: InputTextProps) {
  readOnly = readOnly || !onChange

  return (
    <div className={className}>
      <input
        {...props}
        readOnly={readOnly}
        value={typeof value !== 'string' ? '' : value}
        onChange={readOnly ? null : (event) => onChange(event.target.value)}
        className={classnames('input')}
      />
    </div>
  )
}

InputText.defaultProps = {
  type: 'text'
}
