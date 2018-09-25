```jsx render editor
function onClose() {}

<>
  <Alert type="information" onClose={onClose}>
    New recipes has been generated for this drop.
  </Alert>
  <Alert type="success" onClose={onClose}>
    Success! New manual recipe is created.
  </Alert>
  <Alert type="caution" onClose={onClose}>
    CAUTION! The image you are trying to upload has invalid format. It might not render well. <br />
    <Button type="link.inherit">Proceed Anyway</Button>
  </Alert>
  <Alert type="error" onClose={onClose}>
    ERROR! The drop you were trying to create has invalid inputs.
  </Alert>
</>
```

```jsx render editor
function onClose() {}

<>
  <Alert type="information" onClose={onClose} noFill>
    New recipes has been generated for this drop.
  </Alert>
  <Alert type="success" onClose={onClose} noFill>
    Success! New manual recipe is created.
  </Alert>
  <Alert type="caution" onClose={onClose} noFill>
    CAUTION! The image you are trying to upload has invalid format. It might not render well. <br />
    <Button type="link.inherit">Proceed Anyway</Button>
  </Alert>
  <Alert type="error" onClose={onClose} noFill>
    ERROR! The drop you were trying to create has invalid inputs.
  </Alert>
</>
```
