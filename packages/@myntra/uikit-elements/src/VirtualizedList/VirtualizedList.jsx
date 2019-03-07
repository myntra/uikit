import React from 'react'
import PropTypes from 'prop-types'
import { Measure } from '../index'
import classnames from './VirtualizedList.module.css'

/**
 The virtualized list component.

 @since 0.0.0
 @status REVIEWING
 @example
<div style={{ height: '300px' }}>
  <VirtualizedList items={Array(5000).fill(0)}>
    {({ index }) => <div>Hello {index + 1}</div>}
  </VirtualizedList>
</div>
 */
export default class VirtualizedList extends React.Component {
  static propTypes = {
    /**
     * Array of the input items.
     */
    items: PropTypes.array,
    /**
     * Render method called for every element in the array.
     */
    children: PropTypes.func.isRequired,
    /**
     * Number of rows to render above and below the visible list window.
     */
    overScanCount: PropTypes.number,

    className: PropTypes.string
  }

  static defaultProps = {
    items: [],
    overScanCount: 5
  }

  state = {
    scrollTop: 0,
    itemHeight: 0,
    visibleHeight: 0
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, { passive: true, capture: true })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  setListRef = element => {
    this.list = element
  }

  handleItemHeightMeasure = ({ bounds: { height: itemHeight } }) => {
    if (this.state.itemHeight !== itemHeight) {
      this.setState({ itemHeight })
    }
  }

  handleContainerMeasure = ({ bounds: { height: visibleHeight } }) => {
    if (this.state.visibleHeight !== visibleHeight) {
      this.setState({ visibleHeight })
    }
  }

  handleScroll = event => {
    // TODO: Use animation frame to avoid unnecessary work.
    this.setState(({ itemHeight, visibleHeight }, { items }) => {
      if (this.list && event.target === this.list.parentElement && itemHeight * items.length > visibleHeight) {
        return { scrollTop: event.target.scrollTop }
      }
    })
  }

  /**
   * Check if the row at the provided index should be displayed
   * @param {number} index Row index
   * @returns {boolean} Boolean
   */
  checkIfVisible = index => {
    const { overScanCount } = this.props
    const { itemHeight, visibleHeight, scrollTop } = this.state
    const positionTop = index * itemHeight
    const offset = overScanCount * itemHeight

    return positionTop > scrollTop - offset && positionTop + itemHeight < scrollTop + visibleHeight + offset
  }

  /**
   * Match height of scrollable area
   * @returns {Object.<string, string>} Style Object
   */
  getScrollHeight = () => {
    return this.state.visibleHeight ? { maxHeight: `${this.state.visibleHeight}px` } : null
  }

  /**
   * Calculate height of the list
   * @returns {Object.<string, string>} Style Object
   */
  getListHeight = () => {
    return { height: `${this.props.items.length * this.state.itemHeight}px` }
  }

  /**
   * Calculate height and offset of the row at the provided index
   * @param {number} index Row index
   * @returns {Object.<string, string>} Style Object
   */
  getItemStyle = index => {
    const { itemHeight } = this.state
    return {
      top: `${itemHeight * index}px`,
      height: `${itemHeight}px`
    }
  }

  render() {
    const { items } = this.props
    const { itemHeight } = this.state

    if (!items.length) return null

    if (!itemHeight) {
      return (
        <Measure bounds onMeasure={this.handleItemHeightMeasure}>
          <div data-test-id="sentinel">{this.props.children({ index: 0, item: items[0] })}</div>
        </Measure>
      )
    }

    return (
      <Measure bounds onMeasure={this.handleContainerMeasure}>
        <div className={classnames('container', this.props.className)}>
          <div className={classnames('scroll')} style={this.getScrollHeight()}>
            <div ref={this.setListRef} className={classnames('list')} style={this.getListHeight()}>
              {this.props.items.map(
                (item, index) =>
                  this.checkIfVisible(index) && (
                    <div
                      className={classnames('item')}
                      style={this.getItemStyle(index)}
                      key={index}
                      data-test-id="item"
                    >
                      {this.props.children({ index, item })}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </Measure>
    )
  }
}
