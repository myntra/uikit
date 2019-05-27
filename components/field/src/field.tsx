import React, { PureComponent, ReactNode, ComponentType } from 'react'

import classnames from './field.module.scss'

export interface Props extends BaseProps {
  /**
   * The name of the value.
   */
  title: ReactNode
  /** A small description to set the context of the input field. */
  description?: ReactNode
  /**
   * Display an error message instead of deccription
   */
  error?: ReactNode
  /**
   * Visually conveys that the field is required.
   */
  required?: boolean
}

/**
 * A wrapper component to add title, label and description to form fields.
 *
 * @since 0.6.0
 * @status EXPERIMENTAL
 */
export default function Field({
  title,
  error,
  description,
  required,
  htmlFor,
  children,
  className,
  ...props
}: Props) {
  return (
    <div className={classnames('container', className)} {...props}>
      <label
        id={htmlFor ? htmlFor + '__label' : null}
        className={classnames('title')}
        htmlFor={htmlFor}
      >
        {title}
        {required && <span className={classnames('required')}>*</span>}
      </label>
      {children}
      <div className={classnames('meta')}>
        {error ? (
          <div id={htmlFor ? htmlFor + '__error' : null} role="alert">
            {Array.isArray(error) ? error.join(' ') : error}
          </div>
        ) : (
          description && (
            <div id={htmlFor ? htmlFor + '__description' : null}>
              {description}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export function withField<P extends object>(BaseComponent: any) {
  let counter = 0

  return class InputField extends PureComponent<P & Props> {
    id = ++counter

    render() {
      const { label, error, description, required, ...props } = this.props
      let id = props.id || `__uikit_field_${this.id}_`

      return (
        <Field
          title={label}
          error={error}
          description={description}
          required={required}
          htmlFor={id}
        >
          <BaseComponent
            {...props}
            required={required}
            id={id}
            aria-describedby={`${id}__description ${id}__error`}
            aria-labelledby={`${id}__label`}
          />
        </Field>
      )
    }
  }
}
