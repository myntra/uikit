import React from 'react'
import classnames from './input-text-area.module.scss'

interface InputTextAreaProps extends BaseProps {
  /** @private */
  className?: string
  /** Current value of the text area input field. */
  value?: string
  /** The handler to call when the value changes. */
  onChange?(value: string): void
  /** Displays a disabled text area field */
  disabled?: boolean
  /** Number of Rows*/
  rows?: number
  /** Disable resize and hide resize handle */
  noResize?: boolean
  /** Placeholder */
  placeholder?: string
}

/**
 The textarea component.
 @since 0.0.0
 @status REVIEWING
 @category basic
 @see http://uikit.myntra.com/components/input-text-area
 */
export default function InputTextArea({
  className,
  noResize,
  value,
  onChange,
  ...props
}: InputTextAreaProps) {
  return (
    <div className={classnames(className)}>
      <textarea
        {...props}
        value={value || ''}
        className={classnames('input', { 'no-resize': noResize })}
        onChange={(event) => onChange && onChange(event.target.value)}
      />
    </div>
  )
}

InputTextArea.defaultProps = {
  disabled: false,
  noResize: false,
  rows: 1,
}
