import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '../index'
import classnames from './ProgressBar.module.css'

const ProgressBar = ({ title, value, height, barType }) => (
  <div className={classnames('progress-bar')}>
    {title ? (
      <div className={classnames(title)}>
        <Text>{title}</Text>
      </div>
    ) : null}
    <div className={classnames('bar-container')}>
      <div className={classnames('bar', barType)} style={{ width: `${value}%`, height: `${height}px` }} />
    </div>
  </div>
)

ProgressBar.propTypes = {
  /** Completed percentage */
  value: PropTypes.number.isRequired,
  /** Title */
  title: PropTypes.string,
  /** Height */
  height: PropTypes.number,
  /** Type */
  barType: PropTypes.oneOf(['success', 'info', 'warning', 'danger'])
}

ProgressBar.defaultProps = {
  value: 0,
  height: 9,
  barType: 'success'
}

export default ProgressBar
