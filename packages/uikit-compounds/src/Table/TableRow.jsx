import React from 'react'
import PropTypes from 'prop-types'
import classnames from './Table.module.css'

/**
 Render a table row

 @since 0.3.0
 @status EXPERIMENTAL
 @example
<Table.Row>
  <td>Foo</td>
  <td>Bar</td>
</Table.Row>
 */
function Row({ children, useDiv, className, ...props }) {
  const Tr = useDiv ? 'div' : 'tr'

  return (
    <Tr className={classnames('row', className)} {...props}>
      {children}
    </Tr>
  )
}

Row.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** Contents of the cell */
  children: PropTypes.any,
  /** Render div with display table-row. */
  useDiv: PropTypes.bool
}

export default Row
