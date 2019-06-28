import { createContext } from '@myntra/uikit-context'

export interface TableContext {
  TD(props: BaseProps): any
  TR(props: BaseProps): any
}

const { Provider, Consumer } = createContext<TableContext>(null)

export { Provider, Consumer }
