import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './Flex.module.css'

/**
 Flex is a wrapper for inlining flex based styles in JSX.

 __NOTE:__ Flex is added to UIKit for backward compatibility.
 Prefer using [Grid](../component-compounds/Grid) component for creating layouts.
 Soon, we would either removing it or providing a simpler API with lesser props.

 @since 0.3.0
 @status DEPRECATED
 @example
 <Flex container end bottom>
  <Button modifier='secondary'>CANCEL</Button>
  <Button modifier='primary'>CONFIRM</Button>
 </Flex>
 */
export default class Flex extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    container: PropTypes.bool,
    inline: PropTypes.bool,
    style: PropTypes.object,
    column: PropTypes.bool,
    start: PropTypes.bool,
    center: PropTypes.bool,
    end: PropTypes.bool,
    around: PropTypes.bool,
    between: PropTypes.bool,
    top: PropTypes.bool,
    middle: PropTypes.bool,
    bottom: PropTypes.bool,
    stretch: PropTypes.bool,
    baseline: PropTypes.bool,
    acStart: PropTypes.bool,
    acCenter: PropTypes.bool,
    acEnd: PropTypes.bool,
    acAround: PropTypes.bool,
    acBetween: PropTypes.bool,
    acStretch: PropTypes.bool,
    wrap: PropTypes.bool,
    noWrap: PropTypes.bool,
    wrapReverse: PropTypes.bool,
    reverse: PropTypes.bool,
    asStart: PropTypes.bool,
    asEnd: PropTypes.bool,
    asCenter: PropTypes.bool,
    asBaseline: PropTypes.bool,
    asStretch: PropTypes.bool,
    order: PropTypes.number,
    grow: PropTypes.number,
    shrink: PropTypes.number,
    basis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node,
    equal: PropTypes.bool
  }

  render() {
    const {
      className,
      container,
      inline,
      reverse,
      start,
      center,
      end,
      around,
      between,
      top,
      middle,
      bottom,
      baseline,
      stretch,
      acStart,
      acCenter,
      acEnd,
      acAround,
      acBetween,
      acStretch,
      wrap,
      noWrap,
      wrapReverse,
      children,
      column,
      asStart,
      asEnd,
      asCenter,
      asBaseline,
      asStretch,
      order,
      grow,
      shrink,
      basis,
      equal,
      ...props
    } = this.props

    const styleObj = {}
    if (typeof order !== 'undefined') {
      styleObj.order = order
    }
    if (typeof grow !== 'undefined') {
      styleObj.flexGrow = grow
    }
    if (typeof shrink !== 'undefined') {
      styleObj.flexShrink = shrink
    }
    if (typeof basis !== 'undefined') {
      styleObj.flexBasis = basis
    }

    return React.createElement(
      'div',
      {
        style: styleObj,
        className: classnames(
          {
            flex: container,
            reverse: !column && reverse,
            column: column && !reverse,
            'column-reverse': column && reverse,
            'flex-inline': inline,
            start,
            center,
            end,
            around,
            between,
            top,
            middle,
            bottom,
            baseline,
            stretch,
            'ac-start': acStart,
            'ac-center': acCenter,
            'ac-end': acEnd,
            'ac-around': acAround,
            'ac-between': acBetween,
            'ac-stretch': acStretch,
            wrap,
            'no-wrap': noWrap,
            'wrap-reverse': wrapReverse,
            'item-start': asStart,
            'item-end': asEnd,
            'item-center': asCenter,
            'item-baseline': asBaseline,
            'item-stretch': asStretch,
            equal
          },
          className
        ).use(styles),
        ...props
      },
      children
    )
  }
}
