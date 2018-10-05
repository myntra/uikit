import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import styles from './Loader.module.css'

/**
 * Infinite progress loading indicator.
 *
 * @since 0.5.0
 * @status EXPERIMENTAL
 * @example
 * <div>
 *    Inline <Loader /> loader.
 * </div>
 */
export default function Loader({ className, type }) {
  return (
    <div className={classnames(className, 'loader', type).use(styles)}>
      <div className={classnames('spinner').use(styles)}>
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

Loader.propTypes = {
  /** @private */
  className: PropTypes.string,
  type: PropTypes.oneOf(['inline', 'small', 'large'])
}

Loader.defaultProps = {
  type: 'inline'
}
