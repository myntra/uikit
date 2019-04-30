import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { MeasureCache } from './helpers'

export interface VirtualListCellMeasureProps extends BaseProps {
  cache: MeasureCache
  row: number
  column: number
  onMeasure?(payload: {
    row: number
    column: number
    size: {
      height: number
      width: number
    }
  }): void
}

export default class VirtualListCellMeasure extends Component<
  VirtualListCellMeasureProps
> {
  _defer_count: number

  componentDidMount() {
    this.mayBeMeasure()
  }

  componentDidUpdate() {
    this.mayBeMeasure()
  }

  mayBeMeasure = () => {
    const { cache, row, column } = this.props

    if (!cache.has(row, column)) {
      this.measure()
    }
  }

  measure = () => {
    const { cache, row, column } = this.props
    const currentValue = cache.get(row, column)
    const newValue = this.measureFromDOM()

    if (newValue.height === 0 || newValue.width === 0) {
      this._defer_count = (this._defer_count || 1) + 1

      if (this._defer_count < 5) {
        setTimeout(this.measure, 16)
      }

      return
    }

    this._defer_count = 0
    if (
      !currentValue ||
      (currentValue.width !== newValue.width ||
        currentValue.height !== newValue.height)
    ) {
      this.props.onMeasure({
        row: this.props.row,
        column: this.props.column,
        size: newValue,
      })
    }

    cache.set(row, column, newValue)
  }

  measureFromDOM = () => {
    try {
      const el: HTMLElement = ReactDOM.findDOMNode(this) as any // eslint-disable-line react/no-find-dom-node

      const height = el.offsetHeight
      const width = el.offsetWidth

      return { height, width }
    } catch (error) {
      return { height: 0, width: 0 }
    }
  }

  render() {
    return typeof this.props.children === 'function'
      ? this.props.children({ measure: this.measure })
      : React.Children.only(this.props.children)
  }
}
