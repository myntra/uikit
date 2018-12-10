import React from 'react'
import PropTypes from 'prop-types'
import ProgressCircle from './ProgressCircle'

/**
 Progress Component.
 @since 0.6.0
 @status EXPERIMENTAL
 @example
<Progress type='circle' value={0.35}><Icon name="image"/></Progress>
 */
export default function Progress({ type, ...props }) {
  return type === 'circle' ? <ProgressCircle {...props} /> : null
}

Progress.propTypes = {
  /** Type of the progress component */
  type: PropTypes.oneOf(['circle', 'bar']),
  /** Progress percentage out of 100 */
  value: PropTypes.number.isRequired,
  /** Size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Child to be rendered inside the progress circle */
  children: PropTypes.node
}

Progress.defaultProps = {
  type: 'circle'
}
