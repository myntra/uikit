import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'

/**
 A component to declaratively measure element size.

 @since 0.3.0
 @status EXPERIMENTAL
 @example
<div>
  <Measure bounds onMeasure={content => this.setState({ content })}>
    <textarea />
  </Measure>
  <pre>{JSON.stringify(this.state.content, null, 2)}</pre>
</div>
 */
class Measure extends PureComponent {
  static propTypes = {
    bounds: PropTypes.bool,
    client: PropTypes.bool,
    margin: PropTypes.bool,
    offset: PropTypes.bool,
    scroll: PropTypes.bool,
    onMeasure: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
  }

  constructor(props) {
    super(props)
    this._observer = new ResizeObserver(this.handleMeasure)
    this.state = {
      content: {
        bounds: {},
        client: {},
        margin: {},
        offset: {},
        scroll: {}
      }
    }
  }

  componentWillUnmount() {
    if (this._observer && this._node) {
      this._observer.disconnect(this._node)
    }
  }

  handleMeasure = entries => {
    const content = this.measure(entries[0].target)

    content.entry = entries[0].contentRect

    this.setState({ content })
    this.props.onMeasure(content)
  }

  /**
   * @public
   */
  measure = node => {
    node = node || this._node

    if (!node) return

    const content = {}

    if (this.props.bounds) {
      const rect = node.getBoundingClientRect()

      content.bounds = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }
    }

    if (this.props.client) {
      content.client = {
        top: node.clientTop,
        left: node.clientLeft,
        width: node.clientWidth,
        height: node.clientHeight
      }
    }

    if (this.props.margin) {
      const styles = window.getComputedStyle(node)

      content.margin = {
        top: parseInt(styles.marginTop),
        right: parseInt(styles.marginRight),
        bottom: parseInt(styles.marginBottom),
        left: parseInt(styles.marginLeft)
      }
    }

    if (this.props.offset) {
      content.offset = {
        top: node.offsetTop,
        left: node.offsetLeft,
        width: node.offsetWidth,
        height: node.offsetHeight
      }
    }

    if (this.props.scroll) {
      content.scroll = {
        top: node.scrollTop,
        left: node.scrollLeft,
        width: node.scrollWidth,
        height: node.scrollHeight
      }
    }

    return content
  }

  handleRef = node => {
    if (node) {
      this._observer.observe(node)
    } else if (this._node && this._observer) {
      this._observer.disconnect(this._node)
    }

    this._node = node
  }

  render() {
    if (typeof this.props.children === 'function') {
      return this.props.children({ ref: this.handleRef, measure: this.measure, content: this.state.content })
    }

    return React.cloneElement(React.Children.only(this.props.children), { ref: this.handleRef })
  }
}

export default Measure
