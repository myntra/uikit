import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { memoize } from '@myntra/uikit-utils'
import { prepareHead, prepareBody } from './TableHelpers'

import TableColumn from './TableColumn'
import TableSimple from './TableSimple'
import { Sortable } from '@myntra/uikit-elements'

/**
A simple table.

 @since 0.3.0
 @status EXPERIMENTAL
 @example
<Table data={[
    { id: 1, firstName: "Jane", lastName: "Doe" },
    { id: 2, firstName: "John", lastName: "Doe" },
    { id: 3, firstName: "Adam", lastName: "Seed" },
  ]} sort={['firstName']}>
  <Table.Column key="id" label="ID">
    {({ data }) => <div>{data.id}</div>}
  </Table.Column>
  <Table.Column key="firstName" label="First Name">
    {({ data }) => <div>{data.firstName}</div>}
  </Table.Column>

  <Table.Column key="lastName" label="Last Name">
    {({ data }) => <div>{data.lastName}</div>}
  </Table.Column>
</Table>
 */
class Table extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    /** Data list to display */
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** Unique identifier for a row in table. */
    rowKey: PropTypes.func,
    /** Auto detect column width. `fixed` layout is faster. */
    layout: PropTypes.oneOf(['auto', 'fixed']),
    /** Sort by columns */
    sort: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ column: PropTypes.string, order: PropTypes.oneOf(['ASC', 'DESC']) })
      ])
    ),
    /** List of column keys in order they should be displayed */
    columnOrder: PropTypes.arrayOf(PropTypes.string),
    /** List of `<Table.Column>` components which declares render behaviour */
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    /** Render prop to customize contents of row */
    renderRow: PropTypes.func,
    /** Render div with display table. */
    useDiv: PropTypes.bool,
    /** @private */
    _validateChildren({ children }) {
      React.Children.forEach(children, child => {
        if (child && child.type !== Table.Column) {
          throw new Error('Only Table.Column component can be used as child of Table.')
        }
      })
    }
  }

  static defaultProps = {
    /**
     * @func
     * @param {object} row
     * @param {number} index
     */
    rowKey: (row, index) => index,
    layout: 'fixed',
    renderRow: ({ children }) => React.Children.only(children)
  }

  prepareHead = memoize((children, order) => prepareHead(children.filter(Boolean), order))
  prepareBody = memoize((head, data, rowKey) => prepareBody(head, data, rowKey))
  prepareSort = memoize(sort => sort.map(column => (typeof column === 'string' ? { column, order: 'ASC' } : column)))

  get head() {
    return this.prepareHead(this.props.children, this.props.columnOrder)
  }

  get sort() {
    return this.prepareSort(this.props.sort)
  }

  compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

  render() {
    const render = data => (
      <TableSimple
        data={this.props.data}
        layout={this.props.layout}
        head={this.head}
        body={this.prepareBody(this.head, data, this.props.rowKey)}
        renderRow={this.props.renderRow}
        useDiv={this.props.useDiv}
      >
        {this.props.children}
      </TableSimple>
    )

    return Array.isArray(this.props.sort) && this.props.sort.length ? (
      <Sortable
        data={this.props.data}
        compareFn={(a, b) => {
          for (const { column, order } of this.sort) {
            const val = this.compare(a[column], b[column])

            if (val !== 0) return order === 'DESC' ? -val : val
          }
          return 0
        }}
      >
        {render}
      </Sortable>
    ) : (
      render(this.props.data)
    )
  }
}

// Sub components.
Table.Column = TableColumn
// Table.Row = TableRow
// Table.Cell = TableCell
// Table.SimpleTable = TableSimple

export default Table
