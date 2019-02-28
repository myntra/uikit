import React from 'react'

import classnames from './icon.module.scss'

import './assets/icons.sprite.svg'

import { IconNameGlobal } from './names'

export type IconName = IconNameGlobal[keyof IconNameGlobal]

interface IconProps extends BaseProps {
  /** [FontAwesome](https://fontawesome.com/icons?d=gallery) icon name */
  name: IconName,
  /** Accessibility text for screen readers */
  title?: string,
  spin?: boolean
}

/**
 * Displays a glyph using an SVG sprite-sheet.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category basic
 */
export default function Icon({ name, className, title, spin, ...props } : IconProps) {
  return (
    <svg
      {...props}
      className={classnames(className, { spin }, 'svg')}
      aria-hidden={title ? null : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <use xlinkHref={`#uikit-i-${name}`} aria-hidden={title ? true : null} />
    </svg>
  )
}
