## Types:

```jsx render preview
<>
  <Button type="primary">Button</Button>
  <Button type="secondary">Button</Button>
</>
```

## States:

```jsx render preview
<>
  <Button type="primary" disabled>Button</Button>
  <Button type="secondary" disabled>Button</Button>
</>
```

## Events

```jsx render preview
<>
  { this.state.message } <br />
  <Button
    type="primary"
    onClick={() => this.setState({ message: 'Button was clicked.' })}
  >
    Click Me
  </Button>
</>
```
