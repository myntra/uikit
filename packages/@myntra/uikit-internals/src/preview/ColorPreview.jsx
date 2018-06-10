import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tokens from '@myntra/tokens'

/**
 {describe component}

 @since 0.0.0
 @status EXPERIMENTAL
 @example
 <ColorPreview />
 */
export default class ColorPreview extends Component {
  static propTypes = {
    /** color string */
    color: PropTypes.string
  }

  render() {
    const style = {
      width: '154px',
      height: '154px',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: tokens.size.base,
      background: this.props.color,
      color: tokens.typography.color.dark.secondary
    }
    return <div style={style}>{this.props.color}</div>
  }
}
