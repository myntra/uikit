import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tokens from '@myntra/tokens'

/**
 Displays a text style

 @since 0.0.0
 @status REVIEWING
 @example
 <TextPreview fontSize="12px" fontWeight={400} lineHeight="1.5em" name="Example text">
  Try font in preview
 </TextPreview>
 */
export default class TextPreview extends Component {
  static propTypes = {
    fontSize: PropTypes.string.isRequired,
    fontWeight: PropTypes.number.isRequired,
    lineHeight: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.string
  }

  render() {
    const { name, ...style } = this.props

    return (
      <div style={{ ...style, marginBottom: tokens.size.medium, cursor: 'pointer' }} title={name}>
        {this.props.children || 'There are three responses to a piece of design – yes, no, and WOW!'}
      </div>
    )
  }
}
