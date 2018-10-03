### Use `accessor`, `key` or `children` to render a cell

``` jsx render editor
<Table data={[
  { id: 1, name: 'Jane Doe', age: 24, status: 'single', visits: 80 },
  { id: 2, name: 'John Doe', age: 26, status: 'single', visits: 120 }
]}>
  <Table.Column label="ID" key="id" />
  <Table.Column label="Name" key="anything" accessor="name" />
  <Table.Column label="Info" key="info">
    <Table.Column label="Age" key="age">
      {({ data }) => <span>{ data.age } years</span>}
    </Table.Column>
    <Table.Column label="Status" key="status" />
  </Table.Column>
  <Table.Column label="Statistics" key="statistics">
    <Table.Column label="Visits" key="visits" accessor={({ visits }) => visits + ' of 200'} />
  </Table.Column>
</Table>
```

### Table using `div`

``` jsx render editor
<Table data={[
  { id: 1, name: 'Jane Doe', age: 24, status: 'single', visits: 80 },
  { id: 2, name: 'John Doe', age: 26, status: 'single', visits: 120 }
]} useDiv>
  <Table.Column label="ID" key="id" />
  <Table.Column label="Name" key="anything" accessor="name" column={{ style: { background: 'rgba(255, 0, 0, .54)' } }} />
  <Table.Column label="Age" key="age">
    {({ data }) => <span>{ data.age } years</span>}
  </Table.Column>
  <Table.Column label="Age (in days)" key="ageInDays">
    {({ data }) => <span>{ data.age } years</span>}
  </Table.Column>
  <Table.Column label="Age (in hours)" key="ageInHours">
    {({ data }) => <span>{ data.age * 365 * 24 } hours</span>}
  </Table.Column>
  <Table.Column label="Age (in minutes)" key="ageInMinutes">
    {({ data }) => <span>{ data.age * 365 * 24 * 60 } minutes</span>}
  </Table.Column>
  <Table.Column label="Age (in seconds)" key="ageInSeconds">
    {({ data }) => <span>{ data.age * 365 * 24 * 60 * 60 } seconds</span>}
  </Table.Column>
  <Table.Column label="Age (in milliseconds)" key="ageInMilliseconds">
    {({ data }) => <span>{ data.age * 365 * 24 * 60 * 60 * 1000 } milliseconds</span>}
  </Table.Column>
  <Table.Column label="Status" key="status" />
  <Table.Column label="Visits" key="visits" accessor={({ visits }) => visits + ' of 200'} />
  <Table.Column label="Visits (%)" key="visitsPercentage" accessor={({ visits }) => visits / 2  + '%'} />
  <Table.Column label="New Visits" key="visitsNew" accessor={({ visits }) => visits / 2} />
</Table>
```
