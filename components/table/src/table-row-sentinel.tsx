import React, { PureComponent, Fragment } from 'react'
import Measure from '@myntra/uikit-component-measure'
import { classnames } from '@myntra/uikit-utils'

// eslint-disable-next-line
const FragmentWithFallback = CAN_USE_FRAGMENT
  ? Fragment
  : ({ children }) => <div style={{ display: 'contents' }}>{children}</div>

export interface TableRowSentinelProps extends BaseProps {
  transform?(size: { height: string; width: string }): Record<string, string>
  transformSentinel?(size: {
    height: string
    width: string
  }): Record<string, string>
}

/**
 * A component that renders a sentinel node with same size as the reference node.
 *
 * @since 0.5.0
 * @status READY
 */
export default class TableRowSentinel extends PureComponent<
  TableRowSentinelProps,
  {
    size: {
      height: string
      width: string
    }
  }
> {
  static defaultProps = {
    transform({ height }) {
      return { marginTop: `-${height}` }
    },
    transformSentinel({ height }) {
      return { height }
    },
  }

  state = {
    size: {
      height: '0px',
      width: '0px',
    },
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

    return (
      <FragmentWithFallback>
        <div
          style={this.props.transformSentinel(this.state.size)}
          key="sentinel"
        />
        <Measure bounds onMeasure={this.handleResize} key="measure">
          {React.cloneElement(node, {
            style: {
              ...node.props.style,
              ...this.props.transform(this.state.size),
            },
            className: classnames(this.props.className, node.props.className),
          })}
        </Measure>
      </FragmentWithFallback>
    )
  }
}
