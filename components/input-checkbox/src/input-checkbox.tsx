import React from 'react'
import classnames from './input-checkbox.module.scss'

interface InputCheckBoxProps extends BaseProps {
  /**
   * The state of the checkbox.
   *
   * > **Why `value` instead of `checked`?**
   * >
   * > We have a set convention of having `value` as the controlled input value and `onChange` event to
   * propagate the change to parent component.
   */
  value?: boolean

  /**
   * The handler to call when the value changes.
   */
  onChange?(value: boolean): void

  /**
   * Displays a disabled checkbox field.
   */
  disabled?: boolean

  /**
   * Displays a readonly checkbox field.
   */
  readOnly?: boolean

  /**
   * Checkbox value attribute.
   *
   * > **Why `htmlValue` instead of `value`?**
   * >
   * > We use `value` prop to set controlled value to any `<InputXxx>` component for consistency.
   */
  htmlValue: string

  /**
   * Component to render title for the checkbox
   */
  title?: string

  renderTitle?(): JSX.Element
}

/**
 * The input checkbox component
 *
 * @since 0.0.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/button
 */
export default function InputCheckBox({
  className,
  value,
  htmlValue,
  onChange,
  title,
  readOnly,
  ...props
}: InputCheckBoxProps) {
  readOnly = readOnly || !onChange

  return (
    <label className={classnames(className, 'input')}>
      <div className={classnames('checkbox-input')} role="checkbox">
        <input
          {...props}
          type="checkbox"
          checked={!!value}
          value={htmlValue}
          className={classnames('target')}
          readOnly={readOnly}
          onChange={
            readOnly ? null : (event) => onChange(Boolean(event.target.checked))
          }
        />
        <span className={classnames('checkbox')} aria-hidden="true" />
      </div>
      <span className={classnames('content')}>{title}</span>
    </label>
  )
}
