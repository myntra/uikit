import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import styles from './Table.module.css'

/**
 A simple table.

 @since 0.3.0
 @status EXPERIMENTAL
 */
function TableSimple({ head, body, layout, Row, Cell, className, ...props }) {
  return (
    <div className={classnames('wrapper').use(styles)}>
      <div className={classnames('scroller').use(styles)}>
        <table className={classnames(className, 'table', { fixed: layout === 'fixed' }).use(styles)} {...props}>
          <colgroup>
            {head.colgroup.map(({ colSpan, key, column }) => <col {...column} span={colSpan} key={key} />)}
          </colgroup>
          <thead>
            {head.rows.map(row => (
              <Row key={row.id}>
                {row.columns.map(({ children, key, ...props }) => (
                  <Cell {...props} scope="col" head key={key}>
                    {children}
                  </Cell>
                ))}
              </Row>
            ))}
          </thead>
          <tbody>
            {body.rows.map(row => (
              <Row key={row.id}>
                {row.columns.map(({ children, key, ...props }) => (
                  <Cell key={key} {...props} scope={props.head ? 'row' : undefined}>
                    {children}
                  </Cell>
                ))}
              </Row>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

TableSimple.propTypes = {
  className: PropTypes.string,
  head: PropTypes.object,
  body: PropTypes.object,
  layout: PropTypes.oneOf(['fixed', 'auto']),
  Row: PropTypes.any,
  Cell: PropTypes.any
}

export default TableSimple
