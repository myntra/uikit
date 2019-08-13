# Redux Middleware

The `default export` from any `.js` file in this directory is used as a redux middleware.

## Example

``` js
import { createAppMiddleware } from '@spectrum'

// Create app scoped middleware. `middlewareAPI.getState()`  would return current application state instead of root state.
export default createAppMiddleware(middlewareAPI => next => action => {
  const result = next(action)

  console.log({ action, result })

  return result
})
```
