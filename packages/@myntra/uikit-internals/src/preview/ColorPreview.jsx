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
      width: '128px',
      height: '128px',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: tokens.size.default,
      boxShadow: tokens.shadow.lightSmall,
      background: this.props.color,
      color: tokens.typography.color.dark.secondary,
      textShadow: '.5px .5px rgba(255, 255, 255, .5)'
    }
    return <div style={style}>{this.props.color}</div>
  }
}
