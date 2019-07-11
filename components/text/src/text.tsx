import React, { Children, isValidElement } from 'react'

import classnames from './text.module.scss'

export interface Props extends BaseProps {
  type:
    | 'title'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'paragraph'
    | 'table'
    | 'small'
    | 'caption'
  color?:
    | 'inherit'
    | 'dark'
    | 'light'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'primary'
    | 'accent'
    | 'gray400'
    | 'gray300'
    | 'gray200'
    | 'gray100'
    | 'gray50'
  secondary?: boolean
  disabled?: boolean
  alternate?: boolean
  italic?: boolean
  oblique?: boolean
  size?: 900 | 800 | 700 | 600 | 500 | 400 | 300 | 200
  weight?: 'thin' | 'normal' | 'bold' | 'black' | 'bolder' | 'lighter'
}

/**
 * A utility component for styling text.
 *
 * @since 0.3.0
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/text
 */
export default function Text({
  type,
  children,
  style,
  color,
  size,
  weight,
  ...props
}: Props) {
  const element = isValidElement(children) ? (
    Children.only(children)
  ) : (
    <span>{children}</span>
  )

  if (typeof style === 'string') {
    type = style as any
    style = {}
  }

  const className = classnames(
    element.props && element.props.className,
    'text',
    style || 'current',
    color,
    size && `text${size}`,
    weight,
    type
  )

  return React.cloneElement(element, { className, style, ...props })
}

Text.defaultProps = {
  color: 'inherit',
}
