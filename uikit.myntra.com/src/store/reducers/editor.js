import { createAppActionType, createAction } from '@spectrum'

export const NEW_SOURCE = createAppActionType('new-source')
export const EDIT_SOURCE = createAppActionType('edit-source')

export default (
  state = {
    history: []
  },
  action
) => {
  if (action.type === NEW_SOURCE) {
    const history = state.history.slice(Math.max(state.history.length - 5, 0)) // Take last 5 sources.

    history.push(action.payload)

    return { history }
  } else if (action.type === EDIT_SOURCE) {
    const history = state.history.slice()

    history.pop()
    history.push(action.payload)

    return { history }
  }

  return state
}

export const getters = {
  current: state => (state.history.length ? state.history[state.history.length - 1] : '<div />')
}

export const addNewSource = source => createAction(NEW_SOURCE, source)
export const setCurrentSource = source => createAction(EDIT_SOURCE, source)
