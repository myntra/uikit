import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'

/**
 * A component to declaratively measure element size.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category advanced
 */
class Measure extends PureComponent {
  static propTypes = {
    /**
     * The callback fired when a DOM element is measured.
     */
    onMeasure: PropTypes.func,
    /**
     * The target element to be measured.
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
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
        scroll: {},
      },
    }
  }

  componentWillUnmount() {
    if (this._observer && this._node) {
      this._observer.disconnect(this._node)
    }
  }

  handleMeasure = (entries) => {
    if (!entries.length) return
    const el = entries[0]
    const content = this.measure(el.target)

    this.setState({ content })

    if (this.props.onMeasure) {
      this.props.onMeasure(content)
    }
  }

  /**
   * @public
   */
  measure = (node) => {
    node = node || this._node

    if (!node) return

    const content = {
      get bounds() {
        const rect = node.getBoundingClientRect()

        return {
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        }
      },
      get client() {
        return {
          top: node.clientTop,
          left: node.clientLeft,
          width: node.clientWidth,
          height: node.clientHeight,
        }
      },
      get margin() {
        const styles = window.getComputedStyle(node)

        return {
          top: parseInt(styles.marginTop),
          right: parseInt(styles.marginRight),
          bottom: parseInt(styles.marginBottom),
          left: parseInt(styles.marginLeft),
        }
      },
      get offset() {
        return {
          top: node.offsetTop,
          left: node.offsetLeft,
          width: node.offsetWidth,
          height: node.offsetHeight,
        }
      },
      get scroll() {
        return {
          top: node.scrollTop,
          left: node.scrollLeft,
          width: node.scrollWidth,
          height: node.scrollHeight,
        }
      },
    }

    return content
  }

  handleRef = (node) => {
    if (!this._observer || this._node === node) return

    if (node) {
      if (!(node instanceof window.HTMLElement)) {
        try {
          node = ReactDOM.findDOMNode(node) // eslint-disable-line react/no-find-dom-node
        } catch (e) {
          console.error(e) // TODO: Capture errors in sentry.

          return
        }
      }

      this._observer.observe(node)

      // ResizeObserver does not call on initial render.
      // Call handleMeasure in next macro task.
      setTimeout(() =>
        this.handleMeasure([
          {
            target: node,
            get contentRect() {
              return node.getBoundingClientRect()
            },
          },
        ])
      )
    }

    if (this._node !== node) {
      this._observer.disconnect(this._node)
    }

    this._node = node
  }

  render() {
    if (typeof this.props.children === 'function') {
      return this.props.children({
        ref: this.handleRef,
        measure: this.measure,
        content: this.state.content,
      })
    }

    return React.cloneElement(React.Children.only(this.props.children), {
      ref: this.handleRef,
    })
  }
}

export default Measure
