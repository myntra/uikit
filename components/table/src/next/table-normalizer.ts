import { Children, ReactElement, isValidElement, createElement } from 'react'
import { TableProps } from './table'
import { TableColumnProps, isTableColumn } from './table-column'
import { TableRowProps, isTableRow } from './table-row'
import { TableTD } from './table-td'

export interface TableCellProps<T = any> extends BaseProps {
  index: number

  item: T
}

export interface TableHeaderCellProps<T = any> extends BaseProps {
  value: Record<string, any>
  onChange(value: Record<string, any>): void
}

export class TableBuilder {
  columnsById: Record<string, TableColumnBuilder>
  noHeaderRows: number
  rowCustomizers: Array<TableRowProps>

  getDisplayableColumns() {
    return Object.values(this.columnsById).filter(
      (column) => column.depth === 1
    )
  }

  getSortableColumns() {
    const maxDepth = this.noHeaderRows

    return Object.values(this.columnsById).filter(
      (column) => column.depth === maxDepth
    )
  }

  getNativeTableHeader() {
    const columnsByRowIndex = Array(this.noHeaderRows)
      .fill(null)
      .map(() => [])

    Object.values(this.columnsById).forEach((column) => {
      columnsByRowIndex[column.depth - 1].push(column)
    })

    return Array(this.noHeaderRows)
      .fill(null)
      .map((_, index) => this.tr())
  }

  tr(children) {}

  onRender(props: TableProps) {
    const { children: elements } = props

    const columnsById: Record<string, TableColumnBuilder> = {}
    const rowCustomizers: Array<TableRowProps> = []

    let depth = 0,
      maxDepth = 1
    const processColumn = (
      element: ReactElement<TableColumnProps>
    ): TableColumnBuilder => {
      ++depth
      maxDepth = Math.max(maxDepth, depth)

      try {
        const column = new TableColumnBuilder(element.key, depth, element.props)

        if (__DEV__ && column.id in columnsById) {
          throw new Error(`Duplicate column key: '${column.id}'`)
        }

        columnsById[column.id] = column

        // Filter non-null children
        const children = Children.map(
          element.props.children as any,
          (node) => node
        ).filter((node) => !node)

        // Is it using sub-columns
        if (children.every(isTableColumn)) {
          children.forEach((element) => {
            const child = processColumn(element)

            child.parentColumnId = column.id

            column.subColumnIds.push(child.id)
          })
        } else if (__DEV__ && children.some(isTableColumn)) {
          throw new Error(
            `<Table.Column key="${
              column.id
            }"> should have all or none children of type <Table.Column>`
          )
        }

        return column
      } finally {
        --depth
      }
    }

    Children.forEach(elements as any, (element) => {
      if (isTableColumn(element)) {
        processColumn(element)
      } else if (isTableRow(element)) {
        rowCustomizers.push(element.props)
      }
    })

    this.noHeaderRows = maxDepth
    this.columnsById = columnsById
    this.rowCustomizers = rowCustomizers
  }
}

export class TableColumnBuilder {
  id: string
  depth: number
  rawProps: TableColumnProps
  parentColumnId?: string
  subColumnIds: string[] = []

  constructor(id: string | number, depth: number, rawProps: TableColumnProps) {
    this.id = `${id}`
    this.depth = depth
    this.rawProps = rawProps
  }

  renderHeaderCell({ value, onChange, ...props }: BaseProps) {
    let node =
      typeof this.rawProps.renderLabel === 'function'
        ? this.rawProps.renderLabel(props)
        : this.rawProps.label

    const enhancers = this.rawProps.enhance
      ? Array.isArray(this.rawProps.enhance)
        ? this.rawProps.enhance
        : [this.rawProps.enhance]
      : []

    if (enhancers.length) {
      node = enhancers.reduceRight((children, enhancer) => {
        return enhancer.render({
          children,
          columnId: this.id,
          value: value[enhancer.type],
          onChange: (newValue) =>
            onChange({ ...value, [enhancer.type]: newValue }),
        })
      }, node)
    }

    return this.th(node, props)
  }

  renderCell(props: TableCellProps): JSX.Element {
    if (this.rawProps.children) {
      if (typeof this.rawProps.children === 'function') {
        return this.td(this.rawProps.children(props), props)
      } else {
        return this.td(this.rawProps.children, props)
      }
    } else if (this.rawProps.accessor) {
      if (typeof this.rawProps.accessor === 'function') {
        return this.td(this.rawProps.accessor(props.item, props.index), props)
      } else {
        return this.td(props.item[this.rawProps.accessor], props)
      }
    } else {
      return this.td(props.item[this.id], props)
    }
  }

  td(node: any, props: TableCellProps) {
    return wrapIfRequired(node, props, TableTD)
  }

  th(node: any, props: BaseProps) {
    return wrapIfRequired(node, props, TableTD)
  }
}

function wrapIfRequired(node: any, props: any, wrapper: any): JSX.Element {
  return isValidElement(node) && node.type === wrapper
    ? node
    : createElement(wrapper, props, node)
}
