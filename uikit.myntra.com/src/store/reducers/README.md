# Redux Reducers

The `default export` from any `.js` file in this directory is used as a redux reducer.

Each reducer is registered by filename using `combineReducers` e.g. `user.js` is registered as `user`.

This directory is aliased as `@state` so action creators are easily accessible anywhere in the application.

## Example

``` js
import { createAppActionType } from '@spectrum'

// Create app scoped action name. It automatically detects namespace of current app.
export const SET_USER = createAppActionType('set-user')

export default (state = null, action) => {
  if (action.type === SET_USER) return action.payload

  return state
}

// Action creator for `SET_USER` action.
export const setUser = user => createAction(SET_USER, user)
```

::: TIP
Always export action types and action creators.
:::
