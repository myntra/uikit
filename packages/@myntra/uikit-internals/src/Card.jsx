import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tokens from '@myntra/tokens'

/**
 A lifted container to present any content.

 @since 0.0.0
 @status REVIEWING
 @example
 <Card>I'm in a card.</Card>
 */
export default class Card extends Component {
  static propTypes = {
    /** Padding size. */
    padding: PropTypes.oneOf(Object.keys(tokens.size)),
    /** Card type. */
    type: PropTypes.oneOf(['success', 'info', 'error', 'warning', 'default']),
    /** Is outline card? */
    outline: PropTypes.bool,
    /** Children nodes */
    children: PropTypes.any
  }

  static defaultProps = {
    padding: 'large',
    type: 'default',
    outline: false
  }

  render() {
    return (
      <div
        style={{
          borderColor: 'transparent',
          ...(this.props.outline ? tokens.shape.outline : tokens.shape)[this.props.type],
          borderStyle: 'solid',
          borderWidth: '1px',
          boxShadow: '0 0 5px 0 rgba(0, 0, 0, .2)',
          padding: tokens.size[this.props.padding]
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
