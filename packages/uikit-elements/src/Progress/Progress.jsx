import React from 'react'
import PropTypes from 'prop-types'
import ProgressCircle from './ProgressCircle'
import ProgressBar from './ProgressBar'

/**
 Progress Component.
 @since 0.6.0
 @status EXPERIMENTAL
 @example
 <div>
 <div><Progress type='circle' value={0.35}><Icon name="image"/></Progress></div>
 <div><Progress type='bar' value={20}/></div>
 </div>
 */
export default function Progress({ type, ...props }) {
  switch (type) {
    case 'bar':
      return <ProgressBar {...props} />
    case 'circle':
    default:
      return <ProgressCircle {...props} />
  }
}

Progress.propTypes = {
  /** Type of the progress component */
  type: PropTypes.oneOf(['circle', 'bar']),
  /** Progress percentage out of 100 */
  value: PropTypes.number.isRequired,
  /** Size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Child to be rendered inside the progress circle */
  children: PropTypes.node,
  /** Title */
  title: PropTypes.string,
  /** Height */
  height: PropTypes.number,
  /** Type */
  barType: PropTypes.oneOf(['success', 'info', 'warning', 'danger'])
}

Progress.defaultProps = {
  type: 'circle'
}
