# Components

``` jsx render
<uikit.Table data={Object.values(uikit).filter(it => Boolean(it.__docs)).map(it => it.__docs)} sort={['name']}>
  <uikit.Table.Column key="name" label="Name">
    {({ data }) => <Link 
      to={'/component-' + data.file.replace(/.*(compounds|elements|patterns).*/, (_, m) => m) + '/' +data.name }>{ data.name }</Link>}
  </uikit.Table.Column>
  <uikit.Table.Column key="status" label="Status">
    {({ data }) => <span className={`component-status ${data.status && data.status.toLowerCase()}`}>{ data.status }</span>}
  </uikit.Table.Column>
  <uikit.Table.Column key="since" label="Since">
    {({ data }) => <span>v{ data.since }</span>}
  </uikit.Table.Column>
</uikit.Table>
```
