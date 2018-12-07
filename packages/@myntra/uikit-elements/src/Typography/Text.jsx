import React from 'react'
import PropTypes from 'prop-types'

import classnames from './Typography.module.css'

/**
 * A utility component for styling text.
 *
 * @since 0.3.0
 * @status REVIEWING
 * @example
 * <section>
 * <Text style="heading1">
 *  <h2>Example</h2>
 * </Text>
 *
 * <Text>
 *  <p>
 *  An example text paragraph to
 *  <Text italic>demo</Text> the <Text bolder>Text</Text> utility.</p>
 * </Text>
 * </section>
 */
function Text({ children, style, color, size, weight, ...props }) {
  const element = typeof children === 'string' || !children ? <span>{children}</span> : React.Children.only(children)
  const className = classnames(
    element.props && element.props.className,
    'text',
    style || 'current',
    color,
    size && `text${size}`,
    weight,
    props
  )

  return React.cloneElement(element, { className })
}

Text.propTypes = {
  style: PropTypes.oneOf([
    'title',
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'paragraph',
    'table',
    'small',
    'caption'
  ]),
  color: PropTypes.oneOf([
    'inherit',
    'dark',
    'light',
    'info',
    'success',
    'warning',
    'error',
    'primary',
    'accent',
    'gray400',
    'gray300',
    'gray200',
    'gray100',
    'gray50'
  ]),
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  alternate: PropTypes.bool,
  italic: PropTypes.bool,
  oblique: PropTypes.bool,
  size: PropTypes.oneOf([900, 800, 700, 600, 500, 400, 300, 200]),
  weight: PropTypes.oneOf(['thin', 'normal', 'bold', 'black', 'bolder', 'lighter'])
}

Text.defaultProps = {
  color: 'inherit'
}

export default Text
