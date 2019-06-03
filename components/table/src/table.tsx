import React, { PureComponent, Children, isValidElement } from 'react'
import { RowRendererProps } from './table-interface'
import normalize from './table-normalizer'

import SimpleRenderer from './renderers/simple'
import TableColumn from './table-column'

export interface TableProps<T = any> extends BaseProps {
  data: T[]

  displayColumns?: string[]

  renderRow?(props: RowRendererProps): JSX.Element

  appearance?: 'default' | 'striped'

  virtualized?: boolean
}

interface TableState {
  /**
   * @example js
   *  {
   *    foo: {
   *      [symbol('sort')]: 'asc'
   *    }
   *  }
   */
  enhancers: Record<string, Record<symbol, any>>
}

/**
 * A table.
 *
 * @since 0.3.0
 * @status REVIEWING
 */
export default class Table extends PureComponent<TableProps, TableState> {
  static Column = TableColumn

  state = {
    enhancers: {},
  }

  enhancerSetters: Record<string, (value: any) => void>

  getEnhancerStateForColumn(enhancer: string) {
    return {
      value: this.state.enhancers[enhancer],
      onChange: this.getEnhancerChangeHandler(enhancer),
    }
  }

  getEnhancerChangeHandler(enhancer: string) {
    if (!(enhancer in this.enhancerSetters)) {
      this.enhancerSetters[enhancer] = (value) =>
        this.setState((state) => ({
          enhancers: {
            ...state.enhancers,
            [enhancer]: value,
          },
        }))
    }

    return this.enhancerSetters[enhancer]
  }

  render() {
    const { children, renderRow, virtualized, ...props } = this.props
    const nodes = Children.toArray(children)

    if (!nodes.length) return null

    const node: any = nodes.find(
      (node) =>
        isValidElement(node) &&
        node.type &&
        typeof (node.type as any)._ctor === 'function' &&
        (node.type as any)._status !== 1
    )

    if (node && typeof node.type._ctor === 'function') {
      node.type._ctor().then(() => this.forceUpdate())

      return (
        <div style={{ display: 'none' }} data-note="waiting for children">
          {children}
        </div>
      )
    }

    const table = normalize(children)

    if (!table.columnsByLevel.length) return null

    if (renderRow) {
      table.rows.push({
        selector() {
          return true
        },
        render: renderRow,
      })
    }

    return <SimpleRenderer {...props} config={table} />
  }
}
