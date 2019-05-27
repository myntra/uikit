import React, {
  Component,
  ReactNode,
  FormEvent,
  Children,
  isValidElement,
  ReactElement,
  JSXElementConstructor,
} from 'react'
import Grid from '@myntra/uikit-component-grid'
import {
  ColumnSize,
  Props as GridColumnProps,
} from '@myntra/uikit-component-grid/src/grid-column' // TODO: Handle this kind of type extraction.

import InputCheckbox, {
  Props as InputCheckboxProps,
} from '@myntra/uikit-component-input-checkbox'
import InputDate, {
  Props as InputDateProps,
} from '@myntra/uikit-component-input-date'
import InputMasked, {
  Props as InputMaskedProps,
} from '@myntra/uikit-component-input-masked'
import InputNumber, {
  Props as InputNumberProps,
} from '@myntra/uikit-component-input-number'
import InputS3File, {
  Props as InputS3FileProps,
} from '@myntra/uikit-component-input-s3-file'
import InputSelect, {
  Props as InputSelectProps,
} from '@myntra/uikit-component-input-select'
import InputText, {
  Props as InputTextProps,
} from '@myntra/uikit-component-input-text'
import InputTextArea, {
  Props as InputTextAreaProps,
} from '@myntra/uikit-component-input-text-area'
import Button from '@myntra/uikit-component-button'
import { withField } from '@myntra/uikit-component-field'

import FormAction from './form-action'
import classnames from './form.module.scss'

function isReactNodeType<T extends string | JSXElementConstructor<any>>(
  node: any,
  type: T
): node is ReactElement<any, T> {
  if (!isValidElement(node)) return false
  if (node.type === (type as any)) return true
  if ((node.type as any)._result === type) return true
  return false
}

export interface Props extends BaseProps {
  /**
   * A heading/label for the form.
   */
  title?: ReactNode

  /**
   * Default width of a field in the form.
   */
  defaultFieldSize?: ColumnSize

  /**
   * The callback function called when form is submitted.
   *
   * @param event - Form submission event.
   */
  onSubmit?(event: FormEvent): void
}

export interface FormFieldProps
  extends Pick<
    GridColumnProps,
    Exclude<keyof GridColumnProps, 'className' | 'children'>
  > {}

/**
 * The Form component
 *
 * @since 0.3.0
 * @status REVIEWING
 */
export default class Form extends Component<Props> {
  static Action = FormAction

  static Text = withField<InputTextProps & FormFieldProps>(InputText)
  static Select = withField<InputSelectProps & FormFieldProps>(InputSelect)
  static Checkbox = withField<InputCheckboxProps & FormFieldProps>(
    InputCheckbox
  )
  static CheckBox = withField<InputCheckboxProps & FormFieldProps>(
    InputCheckbox
  ) // For backward compat.
  static Date = withField<InputDateProps & FormFieldProps>(InputDate)
  static S3File = withField<InputS3FileProps & FormFieldProps>(InputS3File)
  static Masked = withField<InputMaskedProps & FormFieldProps>(InputMasked)
  static Number = withField<InputNumberProps & FormFieldProps>(InputNumber)
  static TextArea = withField<InputTextAreaProps & FormFieldProps>(
    InputTextArea
  )

  handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (this.props.onSubmit) {
      this.props.onSubmit(event)
    }
  }

  render() {
    const {
      children,
      title,
      defaultFieldSize,
      onSubmit,
      className,
      ...props
    } = this.props

    const fields = []
    const actions = []

    Children.map(children, (child) => {
      // TODO: Identify button if it's lazy button.
      if (
        isReactNodeType(child, FormAction) ||
        isReactNodeType(child, Button)
      ) {
        actions.push(child)
      } else if (isValidElement(child) || child) {
        fields.push(child)
      }
    })

    return (
      <form
        {...props}
        className={classnames('form', className)}
        onSubmit={this.handleSubmit}
      >
        {title && <div className={classnames('title')}>{title}</div>}
        <Grid multiline gapless key="body">
          {fields.map((field, index) => (
            <Grid.Column
              key={field.key || index}
              size={(field.props && field.props.fieldSize) || defaultFieldSize}
            >
              {field}
            </Grid.Column>
          ))}
        </Grid>
        <div className={classnames('actions')}>{actions}</div>
      </form>
    )
  }
}
