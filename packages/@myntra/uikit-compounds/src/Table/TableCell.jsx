import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './Table.module.css'

/**
 Render a table cell

 @since 0.3.0
 @status EXPERIMENTAL
 @example
<table>
  <tbody>
    <tr>
      <Table.Cell head colSpan={2}>
        Foo
      </Table.Cell>
    </tr>
  </tbody>
</table>
 */
function Cell({ head, children, freeze, className, useDiv, ...props }) {
  const Td = useDiv ? 'div' : head ? 'th' : 'td'

  return (
    <Td {...props} className={classnames('col', className, { freeze, head }).use(styles)}>
      {children}
    </Td>
  )
}

Cell.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** Header cell (`<th>`) */
  head: PropTypes.bool,
  /** Freeze cell */
  freeze: PropTypes.bool,
  /** Number of table columns to use */
  colSpan: PropTypes.number,
  /** Contents of the cell */
  children: PropTypes.any,
  /** Render div with display table-cell. */
  useDiv: PropTypes.bool
}

export default Cell
