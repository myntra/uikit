import React from 'react'
import makeInitials from 'name-initials'

import classnames from './avatar.module.scss'

interface AvatarProps extends BaseProps {
  /** The name of the person/object.  */
  name: string,
  /** The size of the avatar. */
  size?: 'small' | 'medium' | 'large'
}

/**
 * Displays user icon.
 *
 * @since 0.3.1
 * @status EXPERIMENTAL
 * @category basic
 */
export default function Avatar({ name, size, className, ...props }: AvatarProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      width="32"
      height="32"
      className={classnames('avatar', 'inherit', size, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{name}</title>
      <text fontSize="18px" x="50%" y="55%" alignmentBaseline="middle" textAnchor="middle" aria-hidden="true" data-test-id="initials">
        {makeInitials(name.replace(/([^ ])([A-Z])/g, (_, a, b) => a + ' ' + b).trim())}
      </text>
    </svg>
  )
}
