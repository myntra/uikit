## States:

```jsx render editor
<>
  <InputSwitch />
  <InputSwitch value={true} />
  <InputSwitch disabled />
  <InputSwitch value={true} disabled />
  <InputSwitch value={false} disabled />
</>
```

## Events

```jsx render editor
<InputSwitch
  id="toggle"
  value={this.state.checked}
  label="Toggle"
  onChange={checked => this.setState({ checked })}
/>
```
