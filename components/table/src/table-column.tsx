import React, { ReactElement } from 'react'

export interface TableColumnProps extends BaseProps {
  /** Table column header */
  label: string | JSX.Element
  /** Fixed column. */
  fixed: boolean
  /** Number of table columns to use */
  colSpan: number
  /** Accessor to get value. Either a string key or a getter function. */
  accessor: string | ((data: any) => string | JSX.Element)
  /** Either a function to render the cell value or list of sub columns */
  children:
    | ReactElement<TableColumnProps>
    | ReactElement<TableColumnProps>[]
    | ((props: { data: any }) => JSX.Element)
}

/**
 * Declarative way of defining table column configuration. It is a render-less component
 * use to declare rendering behavior of the table.
 *
 * @since 0.3.0
 * @status READY
 */
export default function Column(props: TableColumnProps) {
  // This component is used to collect column configuration. It won't render anything.

  return <span hidden />
}

Column.propTypes = {
  /** @private */
  _validate(props) {
    React.Children.forEach(props.children, (child) => {
      if (child.type !== Column) {
        throw new Error(
          `Only <Table.Column> component can be used as child of <Table.Column>.`
        )
      }
    })
  },
}
