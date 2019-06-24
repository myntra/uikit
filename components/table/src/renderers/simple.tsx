import React, { PureComponent, ReactNode, isValidElement } from 'react'
import { TableMeta, FixedPosition } from '../table-interface'
import classnames from './simple.module.scss'

export interface Props extends BaseProps {
  config: TableMeta
  data: any[]
}

export default class SimpleTable extends PureComponent<Props> {
  state = {
    headers: {
      // TODO: Measure and keep column sizes.
    },
  }

  defaultRowRenderer = {
    selector() {
      return true
    },
    render({ rowId, item, ...props }) {
      return <tr key={rowId} {...props} />
    },
  }

  warpIfNeeded(node: ReactNode, key: string, props: Record<string, any>) {
    if (isValidElement(node)) {
      if (node.type === 'td') {
        return node
      }
    }

    return (
      <td key={key} {...props}>
        {node}
      </td>
    )
  }

  getRowRenderer(rowId: number) {
    const row = this.props.config.rows.find((row) => row.selector(rowId))

    if (!row) return this.defaultRowRenderer

    return row
  }

  getColumnTop() {}

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
                  {columns.map((column, columnIndex) => (
                    <th
                      key={column.id}
                      rowSpan={maxDepth - column.level - column.depth}
                      colSpan={column.colSpan}
                      style={{
                        // @ts-ignore
                        '--sticky-top-offset': headLevel * 35 + 'px',
                        '--sticky-left-offset':
                          typeof column.fixed !== 'undefined'
                            ? columnIndex * 120 + 'px'
                            : 'unset',
                      }}
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
                  children: config.cells.map((column, columnIndex) => {
                    const cellProps = {
                      className: classnames({
                        fixed: typeof column.fixed !== 'undefined',
                      }),
                      style: {
                        '--sticky-left-offset':
                          column.fixed === FixedPosition.START
                            ? columnIndex * 120 + 'px'
                            : column.fixed === FixedPosition.END
                            ? '-100%'
                            : 'unset',
                      },
                    }

                    return this.warpIfNeeded(
                      column.renderCell({
                        ...cellProps,
                        rowId,
                        columnId: column.id,
                        item,
                        data: item,
                        value: column.accessor(item, rowId),
                      }),
                      column.id,
                      cellProps
                    )
                  }),
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
