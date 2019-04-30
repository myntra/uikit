import React from 'react'
import classnames from './input-number.module.scss'

interface InputNumberProps extends BaseProps {
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
 * The InputNumber component.
 * @since 0.0.0
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/input-number
 */
export default function InputNumber({
  className,
  onChange,
  value,
  ...props
}: InputNumberProps): JSX.Element {
  return (
    <div className={className}>
      <input
        {...props}
        type="number"
        value={typeof value !== 'number' ? '' : value}
        className={classnames('input')}
        onChange={(event) =>
          onChange && onChange(parseFloat(event.target.value))
        }
      />
    </div>
  )
}

InputNumber.defaultProps = {
  disabled: false,
}
