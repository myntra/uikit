import React, { ReactNode } from 'react'

import classnames from './icon.module.scss'

import './assets/icons.sprite.svg'

import { IconNameGlobal } from './names'

export type IconName = IconNameGlobal[keyof IconNameGlobal]

interface Props extends BaseProps {
  /** [FontAwesome](https://fontawesome.com/icons?d=gallery) icon name */
  name: IconName | ReactNode
  /** Accessibility text for screen readers */
  title?: string
  /** Spin the  icon continuously in clockwise direction */
  spin?: boolean
  /** Set the size of the icon */
  fontSize?: 'small' | 'medium' | 'large' | 'inherit'
  /** Set the color of the icon */
  color?:
    | 'primary'
    | 'success'
    | 'error'
    | 'warning'
    | 'disabled'
    | 'dark'
    | 'light'
}

/**
 * Displays a glyph using an SVG sprite-sheet.
 *
 * @since 0.0.0
 * @status REVIEWING
 * @category basic
 */
export default function Icon({
  name,
  className,
  title,
  spin,
  fontSize,
  color,
  ...props
}: Props) {
  return (
    <svg
      {...props}
      className={classnames(className, fontSize, color, { spin }, 'svg')}
      aria-hidden={title ? null : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <use xlinkHref={`#uikit-i-${name}`} aria-hidden={title ? true : null} />
    </svg>
  )
}

Icon.defaultProps = {
  fontSize: 'inherit',
  spin: false,
}
