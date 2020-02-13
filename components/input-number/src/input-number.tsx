import React from 'react'
import classnames from './input-number.module.scss'

export interface Props extends BaseProps {
  /** @private */
  className?: string
  /** Displays a disabled number field */
  disabled?: boolean
  /** Current value of the number input field. */
  value?: number
  /** The handler to call when the value changes. */
  onChange?(value: number): void
}

/**
 * An input component to read numbers. It is like `<input type="number">` but
 * value is a JavaScript number.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category input
 * @see http://uikit.myntra.com/components/input-number
 */
export default function InputNumber({
  className,
  onChange,
  value,
  ...props
}: Props): JSX.Element {
  return (
    <div className={className}>
      <input
        {...props}
        type="text"
        value={typeof value !== 'number' || isNaN(value) ? '' : value}
        className={classnames('input')}
        onChange={(event) =>
          onChange && onChange(parseFloat(event.target.value))
        }
      />
    </div>
  )
}
