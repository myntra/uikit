import React, { ReactElement, isValidElement } from 'react'
import { TableCellProps } from './table-normalizer'

export interface TableColumnProps<T = any> extends BaseProps {
  /**
   * Unique column identifier for the column.
   */
  key: string

  /**
   * Header text for the column.
   */
  label?: string

  /**
   * Custom header renderer.
   */
  renderLabel?(props: BaseProps): JSX.Element

  /**
   * Accessor to get value of column from the row object.
   */
  accessor?: string | ((item: T, index: number) => any)

  enhance?: TableColumnEnhancer[] | TableColumnEnhancer

  /**
   * Definition of sub-columns or a render for a cell in the column.
   */
  children:
    | ReactElement<TableColumnProps<T>>
    | Array<ReactElement<TableColumnProps<T>>>
    | ((props: TableCellProps<T>) => JSX.Element)
}

interface TableColumnEnhancerProps extends BaseProps {
  columnId: string
  value: any
  onChange(value: any): void
}

interface TableColumnEnhancer {
  type: string
  render(props: TableColumnEnhancerProps): JSX.Element
  filter(expected, actual): boolean
}

/**
 * Declarative way of defining table column configuration. It is a render-less component
 * use to declare rendering behavior of the table.
 *
 * @since 0.3.0
 * @status READY
 * @category renderless
 * @see http://uikit.myntra.com/components/table#tablecolumn
 */
export default function TableColumn(props: TableColumnProps) {
  // This component is used to configure table. It won't render anything.
  return <span hidden />
}

export function isTableColumn(
  element: any
): element is ReactElement<TableColumnProps> {
  return isValidElement(element) && element.type === TableColumn
}
