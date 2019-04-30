import React, { PureComponent } from 'react'
import { classnames, memoize } from '@myntra/uikit-utils'
import { prepareHead, prepareCellProps } from './helpers'
import TableColumn from './table-column'
// import TableColumnFilter from './table-column-filter'
import TableSimple from './table-simple'
// import TableVirtual from './TableVirtual'

export interface TableProps extends BaseProps {
  data: any[]
  virtualized?: boolean
  sort?: string[] | { column: string; order: 'ASC' | 'DESC' }[]
  layout?: 'auto' | 'fixed'
  columnOrder?: string[]
  useDiv?: boolean
  rowKey?(rowData: any, index: number): string
}

/**
 * A simple table.
 *
 * @since 0.3.0
 * @status REVIEWING
 */
export default class Table extends PureComponent<TableProps> {
  static Column = TableColumn

  static defaultProps = {
    /**
     * @func
     * @param {object} row
     * @param {number} index
     */
    rowKey: (row, index) => index,
    layout: 'fixed',
    renderRow: ({ children, ...props }) => {
      const el = React.Children.only(children)

      if (!el) return el

      const oldProps = el.props || {}

      return React.cloneElement(el, {
        className: classnames(oldProps.className, props.className).use({}),
        style: { ...oldProps.style, ...props.style },
      })
    },
  }

  prepareHead = memoize((children: any, order) =>
    prepareHead(
      React.Children.map(children, (child) => child).filter(Boolean) as any,
      order
    )
  )
  prepareSort = memoize((sort) =>
    sort.map((column) =>
      typeof column === 'string' ? { column, order: 'ASC' } : column
    )
  )

  get head() {
    return this.prepareHead(this.props.children, this.props.columnOrder)
  }

  get sort() {
    return this.prepareSort(this.props.sort)
  }

  compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

  prepareRow = (data, index) => {
    let columns
    const ctx = this

    const row = {
      id: this.props.rowKey(data, index),
      index,
      data,
      getColumn(index) {
        const column = ctx.head.order[index]

        return {
          ...prepareCellProps(column.props as any),
          key: column.key,
          children: column.render({ data, column, meta: column.props }),
        }
      },
      get columns() {
        if (!columns) {
          columns = ctx.head.order.map((column) => ({
            ...prepareCellProps(column.props as any),
            key: column.key,
            children: column.render({ data, column, meta: column.props }),
          }))
        }
        return columns
      },
    }

    return row
  }

  render() {
    const {
      children,
      className,
      columnOrder,
      data,
      layout,
      rowKey,
      sort,
      useDiv,
      virtualized,
      renderRow,
      ...props
    } = this.props
    const InternalTable = virtualized ? null : TableSimple

    const doRender = (data) => (
      <InternalTable
        {...props}
        data={data}
        layout={layout}
        head={this.head}
        prepareRow={this.prepareRow}
        renderRow={renderRow}
        useDiv={useDiv}
      />
    )

    // return Array.isArray(this.props.sort) && this.props.sort.length ? (
    //   <Sortable
    //     data={this.props.data}
    //     compareFn={(a, b) => {
    //       for (const { column, order } of this.sort) {
    //         const val = this.compare(a[column], b[column])

    //         if (val !== 0) return order === 'DESC' ? -val : val
    //       }
    //       return 0
    //     }}
    //   >
    //     {render}
    //   </Sortable>
    // ) : (
    //   )
    return doRender(this.props.data)
  }
}
