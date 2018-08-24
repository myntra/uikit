import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './Table.css'

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
function Cell({
  head,
  children,
  freeze,
  className,
  column, // eslint-disable-line react/prop-types
  ...props
}) {
  const EL = head ? 'th' : 'td'

  return (
    <EL {...props} className={classnames(className, { freeze }).use(styles)}>
      {children}
    </EL>
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
  children: PropTypes.any
}

export default Cell
