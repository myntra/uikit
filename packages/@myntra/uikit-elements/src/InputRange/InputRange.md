## States:

```jsx render preview
<>
  <InputRange
    min={0}
    max={100}
    step={1}
    value={this.state.value}
    onChange={value => {
      this.setState({ value })
    }}
  />
  <InputRange min={0} max={100} step={1} value={40} disabled />
</>
```

## Events

```jsx render preview
<>
  <InputRange
    min={0}
    max={100}
    step={1}
    value={this.state.value}
    onChange={value => {
      this.setState({ value })
    }}
  />
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Min</span>
    <span>Value : {this.state.value}</span>
    <span>Max</span>
  </div>
</>
```
