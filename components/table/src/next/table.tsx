import React, { PureComponent, ReactElement, ReactNode } from 'react'
import { TableCellProps } from './table-normalizer'
import { TableColumnProps } from './table-column'
import { TableRowProps } from './table-row'

export interface TableProps<T = any> extends BaseProps {
  data: T[]

  displayColumns?: string[]

  renderRow?(props: TableCellProps<T>): JSX.Element

  appearance?: 'default' | 'striped'

  children:
    | TableColumnProps<T>
    | Array<ReactElement<TableColumnProps<T> | TableRowProps<T>> | null>
}

/**
 * A simple table.
 *
 * @since 0.3.0
 * @status REVIEWING
 */
export default class Table extends PureComponent<TableProps> {}
