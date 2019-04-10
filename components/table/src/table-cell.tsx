import React from 'react'

import classnames from './table-simple.module.scss'

export interface TableCellProps extends BaseProps {
  /**
   * Display a header cell
   */
  head?: boolean
  /**
   * Number of table columns to use
   */
  colSpan?: number
  /**
   * Render div with display table-cell.
   */
  useDiv: boolean
}

/**
 * Render a table cell
 *
 * @since 0.3.0
 * @status READY
 */
export default function TableCell({
  head,
  children,
  className,
  useDiv,
  subHeaders,
  ...props
}: TableCellProps) {
  const Td = useDiv ? 'div' : head ? 'th' : 'td'

  return (
    <Td {...props} className={classnames('col', className, { head })}>
      {children}
    </Td>
  )
}
