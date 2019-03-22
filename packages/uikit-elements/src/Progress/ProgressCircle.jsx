import React from 'react'
import PropTypes from 'prop-types'
import styles from './ProgressCircle.module.css'

export default class ProgressCircle extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    children: PropTypes.node,
    _validate({ value }) {
      if (value < 0 || value > 1) throw new Error('Value should be between 0 and 1')
    }
  }

  render() {
    const { value, size, children } = this.props
    const height = 24
    const stroke = 3
    const outerRadius = height / 2
    const arcLength = value * 2 * Math.PI * outerRadius
    const arcAngle = value * 360
    const arcEX = outerRadius + Math.sin((arcAngle / 180) * Math.PI) * outerRadius
    const arcEY = outerRadius - Math.cos((arcAngle / 180) * Math.PI) * outerRadius
    const isLarger = arcAngle > 180 ? 1 : 0

    return (
      <div
        className={styles.container + ' ' + styles[size]} // TODO(classnames): Use function.
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={1}
      >
        <svg
          className={styles.progress}
          viewBox={`-${stroke / 2} -${stroke / 2} ${height + stroke} ${height + stroke}`}
        >
          <path
            className={styles.filled}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={arcLength}
            data-test-id="filled"
            d={
              value < 1
                ? `
              M${outerRadius},0
              A${outerRadius},${outerRadius} 0 ${isLarger},1 ${arcEX},${arcEY}
            `
                : `
              M${outerRadius},0
              A${outerRadius},${outerRadius} 0 0,1 ${outerRadius},${outerRadius * 2}
              A${outerRadius},${outerRadius} 0 0,1 ${outerRadius},0
            `
            }
          />
          <circle className={styles.base} strokeWidth={stroke} r={outerRadius} cx={outerRadius} cy={outerRadius} />
        </svg>
        {children}
      </div>
    )
  }
}
