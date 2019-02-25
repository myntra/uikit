import { createAppActionType, createAction } from '@spectrum'

export const SET_USER = createAppActionType('set-user')

export default (state = null, action) => {
  if (action.type === SET_USER) return action.payload

  return state
}

export const setUser = user => createAction(SET_USER, user)
