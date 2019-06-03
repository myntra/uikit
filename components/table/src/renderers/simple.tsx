import React, { PureComponent, ReactNode, isValidElement } from 'react'
import { TableMeta, FixedPosition } from '../table-interface'
import classnames from './simple.module.scss'

export interface Props extends BaseProps {
  config: TableMeta
  data: any[]
}

export default class SimpleTable extends PureComponent<Props> {
  defaultRowRenderer = {
    selector() {
      return true
    },
    render({ rowId, item, ...props }) {
      return <tr key={rowId} {...props} />
    },
  }

  warpIfNeeded(node: ReactNode, key: string) {
    if (isValidElement(node)) {
      if (node.type === 'td') {
        return node
      }
    }

    return <td key={key}>{node}</td>
  }

  getRowRenderer(rowId: number) {
    const row = this.props.config.rows.find((row) => row.selector(rowId))

    if (!row) return this.defaultRowRenderer

    return row
  }

  render() {
    const { config, data, className, children, style, ...props } = this.props
    const maxDepth = config.columnsByLevel.length

    return (
      <div className={classnames('simple', className)} style={style}>
        <div className={classnames('container')}>
          <table {...props} className={classnames('table')}>
            <thead>
              {config.columnsByLevel.map((columns, headLevel) => (
                <tr key={headLevel}>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      rowSpan={maxDepth - column.level - column.depth}
                      colSpan={column.colSpan}
                      style={{ '--sticky-top-offset': headLevel * 35 + 'px' }}
                    >
                      {column.renderHead()}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {data.map((item, rowId) =>
                this.getRowRenderer(rowId).render({
                  rowId,
                  item,
                  children: config.cells.map((column) =>
                    this.warpIfNeeded(
                      column.renderCell({
                        rowId,
                        columnId: column.id,
                        item,
                        data: item,
                        value: column.accessor(item, rowId),
                        className: classnames({
                          fixed: column.fixed === FixedPosition.START,
                        }),
                      }),
                      column.id
                    )
                  ),
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
