import { createContext } from '@myntra/uikit-context'

export interface TableContext {
  TD: any
  TR: any
}

const { Provider, Consumer } = createContext<TableContext>(null)

export { Provider, Consumer }
