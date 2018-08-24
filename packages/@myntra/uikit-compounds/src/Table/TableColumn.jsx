import React from 'react'
import PropTypes from 'prop-types'

/**
 Declarative way of defining table column configuration. It is a render-less component
 use to declare rendering behavior of the table.

 @since 0.3.0
 @status EXPERIMENTAL
 @example
<Table.Column label="Foo">
  {props => <div>{props.value}</div>}
</Table.Column>
 */
function Column(props) {
  return <span hidden />
}

Column.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** Table column header */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /** Number of table columns to use */
  colSpan: PropTypes.number,
  /** Accessor to get value. Either a string key or a getter function. */
  accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** Either a function to render the cell value or list of sub columns */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /** @private */
  _validate(props) {
    React.Children.forEach(props.children, child => {
      if (child.type !== Column) {
        throw new Error(`Only <Table.Column> component can be used as child of <Table.Column>.`)
      }
    })
  }
}

export default Column
