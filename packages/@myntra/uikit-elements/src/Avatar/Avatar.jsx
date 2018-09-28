import React from 'react'
import PropTypes from 'prop-types'
import makeInitials from 'name-initials'
import { classnames } from '@myntra/uikit-utils'

import styles from './Avatar.module.css'

/**
 * A fallback icon for text.
 *
 * @since 0.3.1
 * @status EXPERIMENTAL
 * @example <Avatar name="Jane Doe" />
 */
export default function Avatar({ name, currentColor, className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      className={classnames('avatar', { inherit: currentColor }, className).use(styles)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{name}</title>
      <text x="50%" y="55%" alignmentBaseline="middle" textAnchor="middle" aria-hidden="true">
        {makeInitials(name.replace(/([^ ])([A-Z])/g, (_, a, b) => a + ' ' + b).trim())}
      </text>
    </svg>
  )
}

Avatar.propTypes = {
  /** @private */
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  currentColor: PropTypes.bool
}
