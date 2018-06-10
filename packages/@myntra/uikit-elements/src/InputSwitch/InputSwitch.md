## States:

```jsx render editor
<>
  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
    <InputSwitch />
    <InputSwitch checked />
    <InputSwitch disabled />
    <InputSwitch checked disabled />
  </div>
</>
```

## Events

```jsx render editor
<>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <InputSwitch
      id="toggle"
      checked={this.state.checked}
      onChange={event => this.setState({ checked: event.target.checked })}
    />
    <label for="toggle" style={{ marginLeft: '10px' }}>
      Toggle
    </label>
  </div>
</>
```
