import React from 'react'

import classnames from './loader.module.scss'

export interface Props extends BaseProps {
  /**
   * The variant of the loader.
   */
  type: 'inline' | 'small' | 'large'

  /**
   * Use current color for loading spinner.
   */
  currentColor: boolean

  children: never
}

/**
 * A component to display infinite loading progress.
 *
 * @since 0.5.0
 * @status REVIEWING
 * @category basic
 * @see http://uikit.myntra.com/components/loader
 */
export default function Loader({ className, type }: Props) {
  return (
    <div className={classnames(className, 'loader', type)}>
      <div className={classnames('spinner')}>
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

Loader.defaultProps = {
  type: 'inline',
}
