import React, { Component, createRef } from 'react'
import { MeasureCache } from './helpers'
import { createObserver, Observer } from '@applique-ui/measure'

export interface Props extends BaseProps {
  cache: MeasureCache
  row: number
  column: number
  onMeasure?(
    payload: {
      row: number
      column: number
      size: {
        height: number
        width: number
      }
    },
    data?: DOMStringMap
  ): void
}

const observer = createObserver()

export default class VirtualListCellMeasure extends Component<Props> {
  connection: Observer
  containerRef = createRef<HTMLDivElement>()

  componentDidMount() {
    this.connection = observer.connect(this.measure)

    const node = this.containerRef.current

    if (node) {
      this.connection.observe(node)
    }
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const node = this.containerRef.current

    if (node) {
      this.connection.observe(node)
    }
  }

  componentWillUnmount() {
    this.connection.disconnect()
  }

  /**
   * @param {ResizeObserverEntry} entry
   */
  measure = (entry) => {
    const { cache, row, column } = this.props
    const currentValue = cache.get(row, column)
    const newValue = {
      height:
        (entry.target as HTMLElement).offsetHeight || entry.contentRect.height,
      width:
        (entry.target as HTMLElement).offsetWidth || entry.contentRect.width,
    }

    if (
      !currentValue ||
      currentValue.width !== newValue.width ||
      currentValue.height !== newValue.height
    ) {
      this.props.onMeasure(
        {
          row: this.props.row,
          column: this.props.column,
          size: newValue,
        },
        (entry.target as HTMLElement).dataset
      )
    }

    cache.set(row, column, newValue)
  }

  render() {
    return <div ref={this.containerRef} style={{ display: 'contents' }}>{React.Children.only(this.props.children)}</div>
  }
}
