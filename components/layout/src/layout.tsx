import React from 'react'
import stack, { Props as StackProps } from './stack-layout'
import row, { Props as RowProps } from './row-layout'

export type Props = StackProps | RowProps

const layouts = { stack, row }

/**
 * Predefined layouts to manage organisation and adjust spacing
 * of components.
 *
 * @since 1.9.0
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/layout
 */
export default function Layout(props: Props) {
  const LayoutComponent = layouts[props.type] as any

  return LayoutComponent ? <LayoutComponent {...props} /> : null
}
