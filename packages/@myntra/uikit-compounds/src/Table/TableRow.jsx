import React from 'react'
import PropTypes from 'prop-types'

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
function Row({ children, ...props }) {
  return <tr {...props}>{children}</tr>
}

Row.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** Contents of the cell */
  children: PropTypes.any
}

export default Row
