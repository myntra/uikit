import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import Row from './TableRow'
import Cell from './TableCell'

import styles from './Table.module.css'

/**
 A simple table.

 @since 0.3.0
 @status EXPERIMENTAL
 */
function TableSimple({ head, body, layout, className, renderRow: RowWrapper, useDiv }) {
  const Table = useDiv ? 'div' : 'table'
  const Thead = useDiv ? 'div' : 'thead'
  const Tbody = useDiv ? 'div' : 'tbody'
  return (
    <div className={classnames('wrapper').use(styles)}>
      <div className={classnames('scroller').use(styles)}>
        <Table className={classnames(className, 'table', { fixed: layout === 'fixed' }).use(styles)}>
          <Thead className={classnames('thead').use(styles)}>
            {head.rows.map(row => (
              <RowWrapper key={row.id}>
                <Row useDiv={useDiv}>
                  {row.columns.map(({ children, key, ...props }) => (
                    <Cell {...props} head key={key} useDiv={useDiv}>
                      {children}
                    </Cell>
                  ))}
                </Row>
              </RowWrapper>
            ))}
          </Thead>
          <Tbody className={classnames('tbody').use(styles)}>
            {body.rows.map(row => (
              <RowWrapper key={row.id}>
                <Row useDiv={useDiv}>
                  {row.columns.map(({ children, key, ...props }) => (
                    <Cell key={key} {...props} useDiv={useDiv}>
                      {children}
                    </Cell>
                  ))}
                </Row>
              </RowWrapper>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  )
}

TableSimple.propTypes = {
  className: PropTypes.string,
  head: PropTypes.object,
  body: PropTypes.object,
  layout: PropTypes.oneOf(['fixed', 'auto']),
  renderRow: PropTypes.func,
  /** Render div with display table. */
  useDiv: PropTypes.bool
}

export default TableSimple
