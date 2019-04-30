import React, { ReactElement, Children } from 'react'
import { TableColumnProps } from './table-column'
import { TableColumnFilterProps } from './table-column-filter'

const C = {
  isColumnFilter(
    node?: ReactElement
  ): node is ReactElement<TableColumnFilterProps> {
    return false
    // return node && node.type === ColumnFilter
  },
}

function makeRender(accessor: string | ((data: any) => any)) {
  if (typeof accessor === 'function') {
    return ({ data }) => accessor(data)
  }

  return ({ data }) => data[accessor]
}

export interface TableColumnMeta {
  key: string
  depth: number
  fixed: boolean
  props: Record<string, any>
  render(props: Record<string, any>): JSX.Element
  children: TableColumnMeta[]
}

export function processColumn(
  depth: number,
  column: ReactElement<TableColumnProps | TableColumnFilterProps>
): TableColumnMeta {
  // If ColumnFilter, find internal Column.
  if (C.isColumnFilter(column)) {
    const innerColumn = Children.only(column.props.children)
    const label = innerColumn.props.label

    return processColumn(
      depth,
      React.cloneElement(innerColumn, {
        label: React.cloneElement(column, {
          children: label as any,
        }),
      })
    )
  }

  if (typeof column.key !== 'string')
    throw new Error('Table.Column should have key prop.')

  const {
    children: subColumns,
    label,
    accessor,
    fixed,
    ...props
  } = column.props
  const renderTableCell =
    subColumns && typeof subColumns === 'function'
      ? subColumns
      : React.Children.count(subColumns) === 0
      ? makeRender(accessor || column.key.replace(/^\.\$/, ''))
      : undefined

  const children =
    typeof subColumns === 'function' || !subColumns
      ? []
      : React.Children.count(subColumns) > 1
      ? React.Children.map(subColumns, (item) => processColumn(depth + 1, item))
      : [processColumn(depth + 1, subColumns as any)]

  return {
    key: column.key,
    depth: depth,
    fixed: fixed || children.some((child) => child.fixed === true),
    render: renderTableCell,
    children,
    props: {
      ...props,
      key: column.key,
      children: label,
      colSpan:
        children.reduce((acc, child) => acc + child.props.colSpan, 0) || 1,
    },
  }
}

export function processColumns(columns) {
  return React.Children.map(columns, (column) => processColumn(1, column))
}

export interface TableColumnHeaderMeta {
  key?: string
  children?: any
  fixed?: boolean
  subHeaders: TableColumnHeaderMeta[]
}

function renderTableHeader(
  columns: Record<string, TableColumnMeta>,
  order?: (string)[]
) {
  const items = Object.values(columns)
  const depth = items.reduce((acc, column) => Math.max(acc, column.depth), 1)
  const headers: TableColumnHeaderMeta[][] = Array.apply(null, {
    length: depth,
  }).map(() => [])
  const orderedColumns: TableColumnMeta[] = []

  const generateHeaders = (
    i: number,
    column: TableColumnMeta
  ): TableColumnHeaderMeta => {
    let subHeaders: TableColumnHeaderMeta[] = []

    if (column.children.length) {
      subHeaders = column.children.map((child) => generateHeaders(i + 1, child))
    } else {
      column.props.rowSpan = depth - i
      orderedColumns.push(column)
    }

    const header: TableColumnHeaderMeta = {
      fixed: false,
      ...column.props,
      subHeaders,
    }

    if (i === 0) header.fixed = column.fixed

    headers[i].push(header)

    return header
  }

  order =
    Array.isArray(order) && order.length
      ? order.filter((key) => key && columns[key] && columns[key].depth === 1)
      : items.filter((column) => column.depth === 1).map((column) => column.key)

  order.sort((a, b) => {
    const A = columns[a]
    const B = columns[b]

    if (A.fixed && B.fixed) return 0
    if (A.fixed) return -1
    if (B.fixed) return 1
    return 0
  })

  const colgroup = order.map((key) => generateHeaders(0, columns[key]))

  return {
    order: orderedColumns,
    rows: headers.map((columns, id) => ({
      id,
      columns,
      getColumn(index: number) {
        return columns[index]
      },
    })),
    colgroup,
  }
}

export interface TableHeadMeta {
  columns: Record<string, TableColumnMeta>
  colgroup: TableColumnHeaderMeta[]
  order: TableColumnMeta[]
  rows: {
    id: number
    columns: TableColumnHeaderMeta[]
    getColumn(index: number): TableColumnHeaderMeta
  }[]
}

export function prepareHead(
  ref: ReactElement,
  order?: (string)[]
): TableHeadMeta {
  const columns = {}

  const addToMap = (column) => {
    if (column) {
      if (column.key in columns)
        throw new Error(`Duplicate key '${column.key}' found in table`)
      columns[column.key] = column
      if (column.children) column.children.forEach(addToMap)
    }
  }

  // Process.
  processColumns(ref).forEach(addToMap)

  return { columns, ...renderTableHeader(columns, order) }
}

export function prepareCellProps({
  rowSpan,
  colSpan,
  transformProps,
  ...props
}) {
  if (typeof transformProps === 'function') {
    return transformProps(props)
  }

  return props
}
