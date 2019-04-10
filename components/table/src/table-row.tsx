import React from 'react'
import classnames from './table-simple.module.scss'

export interface TableRowProps extends BaseProps {
  useDiv: boolean
}

/**
 * Render a table row
 *
 * @since 0.3.0
 * @status READY
 */
export default function TableRow({
  children,
  useDiv,
  className,
  ...props
}: TableRowProps) {
  const Tr = useDiv ? 'div' : 'tr'

  return (
    <Tr className={classnames('row', className)} {...props}>
      {children}
    </Tr>
  )
}
