import React, { PureComponent } from 'react'
import {
  createMeasureCache,
  findOverScanRange,
  createPositionManager,
  CellMeasure,
  MeasureCache,
  PositionManager,
} from '@myntra/uikit-component-virtual-list'

export interface VirtualGridProps extends BaseProps {
  /**
   * Number of rows in the grid.
   */
  rows: number
  /**
   * Number of columns in the grid.
   */
  columns: number
  /**
   * Height of the grid container.
   */
  height: number
  /**
   * Width of the grid container.
   */
  width: number
  /**
   * A callback to render grid item at given cell.
   */
  children(props: {
    rowIndex: number
    columnIndex: number
    offsetTop: number
    offsetLeft: number
    rowHeight: number
    columnWidth: number
    isScrolling: boolean
    style: Record<string, string | number>
  }): JSX.Element
  /**
   * Number of columns (from start) always rendered.
   */
  fixedColumns?: number
  /**
   * Number of rows to render outside of viewport.
   */
  overScanRows?: number
  /**
   * Number of columns to render outside of viewport.
   */
  overScanColumns?: number
  /**
   * Estimated item height to estimate content height.
   */
  estimatedCellHeight?: number
  /**
   * Estimated item width to estimate content width.
   */
  estimatedCellWidth: number
  renderScroller?(props: {
    onScroll(event: {
      target: {
        scrollTop: number
        scrollLeft: number
      }
    }): void
    width: number
    height: number
    style: Record<string, string | number>
    children: any
  }): JSX.Element
  renderContainer?(props: {
    /**
     * Height of grid content.
     */
    offsetHeight: number
    /**
     * Width of grid content.
     */
    offsetWidth: number
    /**
     * Height of rendered content.
     */
    renderedHeight: number
    /**
     * Width of rendered content.
     */
    renderedWidth: number
    /**
     * Scroll position from left.
     */
    offsetLeft: number
    /**
     * Scroll position from top.
     */
    offsetTop: number
    /**
     * Styles to position and configure scroll behaviour.
     */
    style: Record<string, string | number>
    className?: string
    children: any
  }): JSX.Element
  renderRow?(props: {
    grid: VirtualGrid
    offsetTop: number
    height: number
    rowIndex: number
    isScrolling: boolean
    scrollLeft: number
    children: any
  }): JSX.Element
  onMeasure?(event: {
    row: number
    column: number
    size: { width: number; height: number }
  }): void
}

/**
 * @since v0.8.0
 * @status READY
 */
export default class VirtualGrid extends PureComponent<
  VirtualGridProps,
  {
    _render: number
    isScrolling: boolean
    scrollTop: number
    scrollLeft: number
    scrollDirectionHorizontal: number
    scrollDirectionVertical: number
  }
> {
  sizes: MeasureCache

  rowManager: PositionManager
  columnManager: PositionManager

  renderCache: Record<string, any>

  isScrollingTimerId: number
  hasPendingRender: number
  scrollFrameId: number

  static defaultProps = {
    estimatedCellHeight: 30,
    estimatedCellWidth: 120,
    overScanRows: 3,
    overScanColumns: 3,
    fixedColumns: 0,
    renderScroller: ({ onScroll, style, children }) => (
      <div style={style} onScroll={onScroll}>
        {children}
      </div>
    ),
    renderContainer: ({ style, children }) => (
      <div style={style}>{children}</div>
    ),
  }

  constructor(props) {
    super(props)

    this.state = {
      _render: 0,
      isScrolling: false,
      scrollTop: 0,
      scrollLeft: 0,
      scrollDirectionHorizontal: 1,
      scrollDirectionVertical: 1,
    }

    this.sizes = createMeasureCache(
      props.estimatedCellHeight,
      props.estimatedCellWidth
    )
    this.rowManager = createPositionManager({
      count: props.rows,
      estimatedSize: props.estimatedCellHeight,
      sizeGetter: (index) =>
        this.sizes.hasMax(index, Infinity) ? this.sizes.rowHeight(index) : null,
    })
    this.columnManager = createPositionManager({
      count: props.columns,
      estimatedSize: props.estimatedCellWidth,
      sizeGetter: (index) =>
        this.sizes.hasMax(Infinity, index)
          ? this.sizes.columnWidth(index)
          : null,
    })
    this.renderCache = {}
  }

  handleScroll = (event) => {
    const el = event.target

    if (el.scrollTop < 0) return

    this.scrollTo(el)
  }

  /** @public */
  scrollTo(position) {
    if (!this.state.isScrolling) this.setState({ isScrolling: true })

    clearTimeout(this.isScrollingTimerId)
    this.isScrollingTimerId = setTimeout(
      () => this.setState({ isScrolling: false }),
      100
    )

    if (this.scrollFrameId == null) {
      this.scrollFrameId = window.requestAnimationFrame(() => {
        this.scrollFrameId = null
        this.computeScrollOffsets(position)
      })
    }
  }

  handleMeasure = ({ row, column, size }) => {
    this.sizes.set(row, column, size)
    this.rowManager.resetCellAt(row)
    this.columnManager.resetCellAt(column)

    if (this.props.onMeasure) {
      this.props.onMeasure({ row, column, size })
    }

    if (!this.hasPendingRender) {
      this.hasPendingRender = setTimeout(() => {
        this.setState((state) => ({ _render: state._render + 1 }))
      }, 16)
    }
  }

  computeScrollOffsets({ scrollTop, scrollLeft }) {
    scrollTop = Math.max(0, scrollTop)
    scrollLeft = Math.max(0, scrollLeft)
    if (
      scrollTop !== this.state.scrollTop ||
      scrollLeft !== this.state.scrollLeft
    ) {
      this.setState({
        scrollTop,
        scrollLeft,
        scrollDirectionVertical: scrollTop < this.state.scrollTop ? -1 : 1,
        scrollDirectionHorizontal: scrollLeft < this.state.scrollLeft ? -1 : 1,
      })
    }
  }

  render() {
    this.hasPendingRender = null

    const {
      width,
      height,
      rows,
      columns,
      fixedColumns,
      overScanRows,
      overScanColumns,
    } = this.props
    const {
      scrollTop,
      scrollLeft,
      scrollDirectionVertical,
      scrollDirectionHorizontal,
      isScrolling,
    } = this.state

    if (isScrolling) {
      this.renderCache = {}
    }

    const visibleVerticalRange = this.rowManager.findVisibleRange(
      scrollTop,
      height
    )
    const visibleHorizontalRange = this.columnManager.findVisibleRange(
      scrollLeft,
      width
    )

    const verticalRange = findOverScanRange(
      visibleVerticalRange,
      scrollDirectionVertical,
      overScanRows,
      rows
    )
    const horizontalRange = findOverScanRange(
      visibleHorizontalRange,
      scrollDirectionHorizontal,
      overScanColumns,
      columns
    )

    const children = []

    const doRenderColumn = ({
      i,
      j,
      rowOffsetTop,
      cellHeight,
      currentRowChildren,
    }) => {
      const renderId = `${i}:${j}`

      if (isScrolling && renderId in this.renderCache) {
        currentRowChildren.push(this.renderCache[renderId])
        return
      }

      const {
        offset: columnOffsetLeft,
        size: cellWidth,
      } = this.columnManager.getCellAt(j)

      const style = {
        position: 'absolute',
        top: rowOffsetTop + 'px',
        left: columnOffsetLeft + 'px',
        minHeight: cellHeight + 'px',
        minWidth: cellWidth + 'px',
      }

      const node = this.props.children({
        rowIndex: i,
        columnIndex: j,
        offsetTop: rowOffsetTop,
        offsetLeft: columnOffsetLeft,
        rowHeight: cellHeight,
        columnWidth: cellWidth,
        isScrolling,
        style,
      })

      const cell = node ? (
        <CellMeasure
          key={i + ':' + j}
          row={i}
          column={j}
          cache={this.sizes}
          onMeasure={this.handleMeasure}
        >
          {node}
        </CellMeasure>
      ) : (
        node
      )

      if (isScrolling && cell) {
        this.renderCache[renderId] = cell
      }

      currentRowChildren.push(cell)
    }

    const doRenderRow = ({ i }) => {
      const currentRowChildren = []
      const {
        offset: rowOffsetTop,
        size: cellHeight,
      } = this.rowManager.getCellAt(i)

      for (let j = 0; j < fixedColumns && j < horizontalRange.start; ++j) {
        doRenderColumn({ i, j, rowOffsetTop, cellHeight, currentRowChildren })
      }

      for (let j = horizontalRange.start; j <= horizontalRange.end; ++j) {
        doRenderColumn({ i, j, rowOffsetTop, cellHeight, currentRowChildren })
      }

      if (this.props.renderRow) {
        children.push(
          this.props.renderRow({
            offsetTop: rowOffsetTop,
            height: cellHeight,
            rowIndex: i,
            children: currentRowChildren,
            grid: this,
            isScrolling,
            scrollLeft,
          })
        )
      } else {
        children.push(...currentRowChildren)
      }
    }

    for (let i = verticalRange.start; i <= verticalRange.end; ++i) {
      doRenderRow({ i })
    }

    const offsetHeight = this.rowManager.size
    const offsetWidth = this.columnManager.size
    const renderedHeight =
      this.rowManager.getCellAt(verticalRange.end).offset +
      this.rowManager.getCellAt(verticalRange.end).size -
      this.rowManager.getCellAt(verticalRange.start).offset
    const renderedWidth =
      this.columnManager.getCellAt(horizontalRange.end).offset +
      this.columnManager.getCellAt(horizontalRange.end).size -
      this.columnManager.getCellAt(horizontalRange.start).offset

    return this.props.renderScroller({
      onScroll: this.handleScroll,
      width,
      height,
      style: {
        overflow: 'auto',
        height: height + 'px',
        width: width + 'px',
      },
      children: this.props.renderContainer({
        offsetHeight,
        offsetWidth,
        renderedHeight,
        renderedWidth,
        offsetLeft: this.columnManager.getCellAt(horizontalRange.start).offset,
        offsetTop: this.rowManager.getCellAt(verticalRange.start).offset,
        style: {
          overflow: 'hidden',
          position: 'relative',
          height: offsetHeight + 'px',
          width: offsetWidth + 'px',
        },
        children,
      }),
    })
  }
}
