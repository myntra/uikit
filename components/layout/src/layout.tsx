import React from 'react'
import stack, { Props as StackProps } from './stack-layout'
import row, { Props as RowProps } from './row-layout'

export type Props = StackProps | RowProps

const layouts = { stack, row }

export default function Layout(props: Props) {
  const LayoutComponent = layouts[props.type] as any

  return LayoutComponent ? <LayoutComponent {...props} /> : null
}
