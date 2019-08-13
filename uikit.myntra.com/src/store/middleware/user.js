import { createAppMiddleware } from '@spectrum'

export default createAppMiddleware(middlewareAPI => next => action => {
  // `state` is application state.
  const result = next(action)

  return result
})
