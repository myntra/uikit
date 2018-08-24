# Table

Render provided data in tabular form.

## Data Types

``` ts
type DataRow = { [key: string]: any }
type Data = Array<DataRow>
interface RowMeta {
  fixed: bool | 'start' | 'end'
  isHeader: bool
  isSelected: bool
  isCollapsed: bool
  highlight: 'default' | 'success' | 'info' | 'warning' | 'danger'
}

interface CellMeta extends RowMeta {
  isEditable: bool
  isEditing: bool
}
```

## Components

### `<TableContext>`

- **Props:**

  ``` ts
  interface Props {
    data: Data,
    columns: Array<string> // - column order and column selection
    renderRow: ({ data: Data, meta: RowMeta }) => React.Element
    children: Array<TableColumn>
  }
  ```

### `<Table.Column>`

  ``` ts
  interface Props {
    key: string // -- React key is mandatory and is used as column identifier too.
    renderHead: () => React.Element
    renderCell: ({ data: Data, meta: CellMeta }) => React.Element
  }
  ```

## Usage :

### Simple

``` jsx
export default function UserDetails({ users }) {
  return (
    <Table data={users}>
      <Table.Column
        renderHead={() => 'Name'}
        renderCell={({ data }) => data.name}
      />
      <Table.Column
        renderHead={() => 'Email'}
        renderCell={({ data }) => data.email}
      />
      {['phone', 'address'].map(field => (
        <Table.Column
          renderHead={() => field}
          renderCell={({ data }) => data[field]}
        />
      ))}
    </Table>
  )
}
```

### Sorting

``` jsx
<Sortable data={this.state.items} onSort={(cues) => serviceCall(cues).then(items => this.setState({ items }))}>
  {({ data }) => <UserDetails users={data} />}
</Sortable>
```

### Pagination

``` jsx
<Paginated page={this.state.page} onPage={(page) => serviceCall(page).then(items => this.setState({ page }))}>
  {({ page }) => <Table users={page.content} />}
</Paginated>
```

### Pagination + Sorting

``` jsx
<Paginated page={this.state.page} onPage={(page) => serviceCall(page, this.state.cues).then(items => this.setState({ page }))}>
  {({ page }) => (
    <Sortable data={page.content} onSort={(cues) => serviceCall(this.state.page, cues).then(items => this.setState({ cues, page }))}>
      {({ data }) => <Table users={data} />}
    </Sortable>
  )}
</Paginated>
```

### Fixed Cells

``` jsx
<Table data={users}>
  <Table.Column key="name">
    <Table.Column key="firstName" label="First Name" />
    <Table.Column key="lastName" label={<span>Last Name</span>}>
      {({ data }) => data.lastName}
    </Table.Column>
  </Table.Column>
  <Table.Column key="email"
    label={({ fixed }) => fixed ? <span>Email</span> : <b>Email</b>}
  >
    {({ data }) => <span>data.email</span>}
  </Table.Column>
  {['phone', 'address'].map(field => (
    <Table.Column key={field} label={field}>
      {({ data }) => <InputText value={data[field]} />}
    </Table.Column>
  ))}
</Table>
```

## Column Implementation

``` jsx
function Column(props) {
  const id = this.key
  const { children, ...meta } = props
  const context = props[TABLE_CONTEXT]
  const column = context.addColumn(id, meta)

  return <>
    {React.Children.map(children, child => React.cloneElement(child, { TABLE_CONTEXT: context, parent: column }))}
  </>
}
```

## Table Implementation

``` jsx
const COLUMN_REACTIVE_META_KEYS = ['fixed']
class Table extends PureComponent {
  state = {
    columns: {}
  }

  addColumn(id, { parent, ...meta }) {
    return this.updateColumn(parent, id, column => {
      if (!column) {
        Object.defineProperty(meta, 'span', {
          get () {
            return this.columns ? Object.keys(this.columns).length : 1
          }
        })

        return meta
      }
      if (COLUMN_REACTIVE_META_KEYS.any(key => column[key] !== meta[key])) return { ...column, ...meta }
    })
  }

  updateColumn(parent, id, fn) {
    parent = parent || { id: [] }

    const columns = this.getColumn(parent.id)
    const column = fn(columns[id])
    const ref = { id: [...parent.id, id ]}

    if (column) this.setColumn(ref.id, column)

    return ref
  }
}
```
