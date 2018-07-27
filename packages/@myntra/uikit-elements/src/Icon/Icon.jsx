import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import aliases from './icons'
import styles from './Icon.css'
import useIcons from './icons.sprite'

if (typeof useIcons === 'function') useIcons()

/**
 * General purpose SVG icon.
 *
 * __Note:__ In your webpack config, you have to include a rule to load SVG icon sprites.
 * ``` js
 * {
 *    test: /\.sprite$/,
 *    loader: '@myntra/uikit-icon-loader'
 * }
 * ```
 * @since 0.0.0
 * @status REVIEWING
 * @example <Icon name="alert" />
 */
function Icon({ name, className, title, spin, ...props }) {
  return (
    <svg
      {...props}
      className={classnames(className, { spin }, 'svg').use(styles)}
      aria-hidden={title ? null : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <use xlinkHref={`#${aliases[name] || name}`} aria-hidden={title ? true : null} />
    </svg>
  )
}

Icon.propTypes = {
  /** @private */
  className: PropTypes.string,
  name: PropTypes.oneOf(Object.keys(aliases)).isRequired,
  /** Alternative text for screen readers. */
  title: PropTypes.string,
  /** Spinning icon */
  spin: PropTypes.bool
}

export default Icon
