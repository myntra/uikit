import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import styles from './Icon.module.css'
import regular from './sprites/regular.svg'
import { injectSVG, fetchIfRequired } from './sprite'

injectSVG('uikit-icons', fetchIfRequired(regular))

/**
 * General purpose SVG icon.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @example <Icon name="badge" />
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
      <use xlinkHref={`#${name}`} aria-hidden={title ? true : null} />
    </svg>
  )
}

Icon.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** [FontAwesome](https://fontawesome.com/icons?d=gallery) icon name. */
  name: PropTypes.string.isRequired,
  /** Alternative text for screen readers. */
  title: PropTypes.string,
  /** Spinning icon */
  spin: PropTypes.bool
}

export default Icon
