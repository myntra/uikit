import React from 'react'

function makeRender(accessor) {
  if (typeof accessor === 'function') {
    return ({ data }) => accessor(data)
  }

  return ({ data }) => data[accessor]
}

export function processColumn(depth, column) {
  if (!column.key) throw new Error('Table.Column should be keyed.')

  const { children: ref, label, accessor, ...props } = column.props
  const isRenderFunction = ref && typeof ref === 'function'
  const render = isRenderFunction
    ? ref
    : React.Children.count(ref) === 0
      ? makeRender(accessor || column.key)
      : undefined
  const children = render
    ? []
    : React.Children.count(ref) > 1
      ? React.Children.map(ref, item => processColumn(depth + 1, item))
      : [processColumn(depth + 1, ref)]

  return {
    key: column.key,
    depth: depth,
    render,
    children,
    props: {
      ...props,
      key: column.key,
      children: label,
      colSpan: children.reduce((acc, child) => acc + child.props.colSpan, 0) || 1
    }
  }
}
export function processColumns(columns) {
  return React.Children.map(columns, column => processColumn(1, column))
}

function renderTableHeader(columns, order) {
  const items = Object.values(columns)
  const depth = items.reduce((acc, column) => Math.max(acc, column.depth), 1)
  const rows = Array.apply(null, { length: depth }).map(() => [])
  const orderedColumns = []
  const generateHeaders = (i, column) => {
    rows[i].push(column.props)

    if (column.children.length) {
      column.children.forEach(child => generateHeaders(i + 1, child))
    } else {
      column.props.rowSpan = depth - i
      orderedColumns.push(column)
    }
  }

  order =
    Array.isArray(order) && order.length
      ? order.filter(key => key && columns[key] && columns[key].depth === 1)
      : items.filter(column => column.depth === 1).map(column => column.key)

  order.forEach(key => generateHeaders(0, columns[key]))

  return { order: orderedColumns, rows: rows.map((columns, id) => ({ id, columns })), colgroup: rows[0] }
}

export function prepareHead(ref, order) {
  const columns = {}
  const addToMap = column => {
    if (column.key in columns) throw new Error(`Duplicate key '${column.key}' found in table`)
    columns[column.key] = column
    column.children.forEach(addToMap)
  }

  // Process.
  processColumns(ref).forEach(addToMap)

  return { columns, ...renderTableHeader(columns, order) }
}

function prepareCellProps({ rowSpan, colSpan, transformProps, ...props }) {
  if (typeof transformProps === 'function') {
    return transformProps(props)
  }

  return props
}

export function prepareBody(head, data, id) {
  return {
    rows: data.map((row, index) => ({
      index,
      data: row,
      id: id(row, index),
      columns: head.order.map(column => ({
        ...prepareCellProps(column.props),
        key: column.key,
        children: column.render({ data: row, column, meta: column.props })
      }))
    }))
  }
}
