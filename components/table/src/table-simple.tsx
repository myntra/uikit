import React, { Component } from 'react'

import TableRow from './table-row'
import TableCell from './table-cell'
import Sentinel from './table-row-sentinel'

import classnames from './table-simple.module.scss'
import { TableHeadMeta } from './helpers'

interface TableSimpleProps extends BaseProps {
  head: TableHeadMeta
  prepareRow(rowData: any, index: number): any
  renderRow(props: {
    data: any
    index: number
    key: string
    WithSentinel: typeof withSentinel
    renderSentinel: typeof withSentinel
    children: JSX.Element
  }): JSX.Element
  layout: 'auto' | 'fixed'
  useDiv: boolean
}

/* eslint-disable react/prop-types */
const withSentinel = ({ children }) => (
  <Sentinel
    className={classnames('sentinel')}
    transform={({ height }) => ({
      marginTop: '-' + (parseFloat(height) - 1) + 'px',
    })}
    transformSentinel={({ height }) => ({
      height: parseFloat(height) - 2 + 'px',
    })}
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
class TableSimple extends Component<TableSimpleProps> {
  hasWarned: boolean

  render() {
    const {
      head,
      data,
      prepareRow,
      layout,
      className,
      renderRow: CustomRowElement,
      useDiv,
      children,
      ...props
    } = this.props
    if (data.length > 200 && !this.hasWarned) {
      this.hasWarned = true

      console.warn(
        'For large datasets virtual mode should be used. <Table virtual>'
      )
    }

    const Table = useDiv ? 'div' : 'table'
    const Thead = useDiv ? 'div' : 'thead'
    const Tbody = useDiv ? 'div' : 'tbody'

    const renderRow = ({ item, index }) => {
      const row = prepareRow(item, index)

      return (
        <CustomRowElement
          key={row.id}
          data={row.data}
          index={row.index}
          WithSentinel={withSentinel}
          renderSentinel={withSentinel}
        >
          <TableRow useDiv={useDiv}>
            {row.columns.map(({ children, key, ...props }) => (
              <TableCell key={key} {...props} useDiv={useDiv}>
                {children}
              </TableCell>
            ))}
          </TableRow>
        </CustomRowElement>
      )
    }

    return (
      <div {...props} className={classnames('wrapper', className)}>
        <div className={classnames('scroller')}>
          <Table
            className={classnames(className, 'table', {
              fixed: layout === 'fixed',
            })}
          >
            <Thead className={classnames('thead')}>
              {head.rows.map((row) => (
                <TableRow key={row.id} useDiv={useDiv}>
                  {row.columns.map(({ children, key, fixed, ...props }) => (
                    <TableCell {...props} head key={key} useDiv={useDiv}>
                      {typeof children === 'function'
                        ? children({ fixed })
                        : children}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Thead>
            <Tbody className={classnames('tbody')}>
              {data.map((item, index) => renderRow({ item, index }))}
            </Tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default TableSimple
