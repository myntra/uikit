import React from 'react'
import PropTypes from 'prop-types'

import Row from './TableRow'
import Cell from './TableCell'

import classnames from './Table.module.css'
import Sentinel from './Sentinel'

/* eslint-disable react/prop-types */
const WithSentinel = /* istanbul ignore next: trivial style generation code (difficult to test). */ ({ children }) => (
  <Sentinel
    className={classnames('sentinel')}
    transform={({ height }) => ({ marginTop: '-' + (parseFloat(height) - 1) + 'px' })}
    transformSentinel={({ height }) => ({ height: parseFloat(height) - 2 + 'px' })}
  >
    {children}
  </Sentinel>
)
/* eslint-enable react/prop-types */

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
    <div className={classnames('wrapper')}>
      <div className={classnames('scroller')}>
        <Table className={classnames(className, 'table', { fixed: layout === 'fixed' })}>
          <Thead className={classnames('thead')}>
            {head.rows.map(row => (
              <RowWrapper key={row.id} head>
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
          <Tbody className={classnames('tbody')}>
            {body.rows.map(row => (
              <RowWrapper key={row.id} data={row.data} index={row.index} WithSentinel={WithSentinel}>
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

TableSimple.defaultProps = {
  renderRow({ children }) {
    return React.Children.only(children)
  }
}

export default TableSimple
