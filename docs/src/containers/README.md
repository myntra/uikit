# Container Component

As per spectrum conventions, only a **container component** should use redux state. This directory is aliased as `@containers` to make it easy to consume anywhere the application.

## Example

``` jsx
import React from 'react'
import { withAppState } from '@spectrum'
import { setUser } from '@state/user' // alias for 'src/store/reducers/user.js'

function EditUsername({ value, onChange }) {
  return (
    <dir>
      <label>Username</label>
      <input value={value} onChange={onChange} />
    </div>
  )
}

// ... prop types definition ...

// Connect application state.
//  state.{reducer-name}
export default withAppState(
  state => ({ value: state.user })),
  { onChange: setUser }
)(EditUsername)
```
