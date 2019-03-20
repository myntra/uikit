import React, { createContext as createNativeContext, ProviderProps, ConsumerProps, PureComponent, Children, FunctionComponent, Component } from 'react'

export interface LinkProps {
  href: string | any
  children?: any
}

export interface RouterLinkProps {
  to: string | object
  children?: any
}

export interface UIKitContext {
  Link: React.FunctionComponent<LinkProps>,
  RouterLink: React.FunctionComponent<RouterLinkProps>
}

export const DEFAULT_CONTEXT: UIKitContext = {
  Link({ href, children }) {
    return <a href={href}>{children}</a>
  },
  RouterLink({ to, children }) {
    return <a href={`${to}`}>{children}</a>
  }
}

// Fallback Context.
let counter = 0
export function createContext<T>(defaultValue: T): React.Context<T> {
  if (CAN_USE_CONTEXT) return createNativeContext(defaultValue)

  const id = `__$$Context${counter++}`
  const ProviderType = Symbol(id + 'Provider')
  const ConsumerType = Symbol(id + 'Consumer')

  class Provider extends PureComponent<ProviderProps<T>> {
    static childContextTypes = {
      [id]() { }
    }

    static get $$typeof() {
      return ProviderType
    }

    getChildContext() {
      return { [id]: this.props.value }
    }

    render() {
      return Children.only(this.props.children)
    }
  }

  class Consumer extends Component<ConsumerProps<T>> {
    static contextTypes = {
      [id]() { }
    }

    static get $$typeof() {
      return ConsumerType
    }

    render() {
      return this.props.children(
        (this.context && this.context[id]) || defaultValue
      )
    }
  }

  return { Provider, Consumer } as any
}

export default createContext(DEFAULT_CONTEXT)
