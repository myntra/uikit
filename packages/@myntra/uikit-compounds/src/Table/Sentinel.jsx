import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Measure } from '@myntra/uikit-elements'
import { classnames } from '@myntra/uikit-utils'

// import styles from './Sentinel.module.css'

/**
 * A component that renders a sentinel node with same size as the reference node.
 *
 * @since 0.5.0
 * @status EXPERIMENTAL
 * @example
 * <Sentinel />
 */
export default class Sentinel extends PureComponent {
  static propTypes = {
    /** @private */
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    transform: PropTypes.func,
    transformSentinel: PropTypes.func
  }

  static defaultProps = {
    transform({ height }) {
      return { marginTop: `-${height}` }
    },
    transformSentinel({ height }) {
      return { height }
    }
  }

  state = {
    size: {
      height: '0px',
      width: '0px'
    }
  }

  handleResize = ({ bounds: { width, height } }) => {
    width = width + 'px'
    height = height + 'px'

    if (width !== this.state.size.width || height !== this.state.size.height) {
      this.setState({ size: { width, height } })
    }
  }

  render() {
    const node = React.Children.only(this.props.children)

    return [
      <div style={this.props.transformSentinel(this.state.size)} key="sentinel" />,
      <Measure bounds onMeasure={this.handleResize} key="measure">
        {React.cloneElement(node, {
          style: { ...node.props.style, ...this.props.transform(this.state.size) },
          className: classnames(this.props.className, node.props.className)
        })}
      </Measure>
    ]
  }
}
