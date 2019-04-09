import React from 'react'

import ProgressBar, { ProgressBarProps } from './progress-bar'
import ProgressCircle, { ProgressCircleProps } from './progress-circle'

export type ProgressProps =
  | ({
      /**
       * Type of progress view (bar or circular).
       */
      type: 'bar'
    } & ProgressBarProps)
  | ({ type: 'circle' } & ProgressCircleProps)

/**
 * A component to display loading progress.
 *
 * @since 0.6.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/progress
 */
export default function Progress({ type, ...props }: ProgressProps) {
  return type === 'bar' ? (
    <ProgressBar {...props} />
  ) : type === 'circle' ? (
    <ProgressCircle {...props} />
  ) : null
}

Progress.Bar = ProgressBar
Progress.Circle = ProgressCircle
