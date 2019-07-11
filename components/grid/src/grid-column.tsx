import React from 'react'

import classnames from './grid-column.module.scss'

export type ColumnSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'full'
  | 'three-quarters'
  | 'two-thirds'
  | 'half'
  | 'one-third'
  | 'one-quarter'
  | 'one-fifth'
  | 'two-fifth'
  | 'three-fifth'
  | 'four-fifth'

export interface Props extends BaseProps {
  /** Take only required space */
  narrow?: boolean
  /** Width */
  size?: ColumnSize
  /** Leaves empty space on left */
  offset?: ColumnSize
  // TODO: Add responsive grid.
  // /** Narrow on mobile screen */
  // narrowOnMobile?: boolean
  // /** Width on mobile screen */
  // sizeOnMobile?: ColumnSize
  // /** Offset on mobiles screen */
  // offsetOnMobile?: ColumnSize
  // /** Narrow on tablet screen */
  // narrowOnTablet?: boolean
  // /** Width on tablet screen */
  // sizeOnTablet?: ColumnSize
  // /** Offset on tablet screen */
  // offsetOnTablet?: ColumnSize
  // /** Narrow on touch enabled devices */
  // narrowOnTouch?: boolean
  // /** Width on touch enabled devices */
  // sizeOnTouch?: ColumnSize
  // /** Offset on touch enabled devices */
  // offsetOnTouch?: ColumnSize
  // /** Narrow on desktop screen */
  // narrowOnDesktop?: boolean
  // /** Width on desktop screen */
  // sizeOnDesktop?: ColumnSize
  // /** Offset on desktop screen */
  // offsetOnDesktop?: ColumnSize
}

/**
 * Sub component of `<Grid>`.
 *
 * @since 0.0.0
 * @status REVIEWING
 */
export default function GridColumn({
  className,
  children,

  narrow,
  narrowOnMobile,
  narrowOnTablet,
  narrowOnTouch,
  narrowOnDesktop,

  size,
  sizeOnMobile,
  sizeOnTablet,
  sizeOnTouch,
  sizeOnDesktop,

  offset,
  offsetOnMobile,
  offsetOnTablet,
  offsetOnTouch,
  offsetOnDesktop,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={classnames('column', className, {
        narrow,
        'narrow-mobile': narrowOnMobile,
        'narrow-tablet': narrowOnTablet,
        'narrow-touch': narrowOnTouch,
        'narrow-desktop': narrowOnDesktop,
        // all
        [`is-${size}`]: size,
        [`offset-${offset}`]: offset,
        // mobile
        [`is-${sizeOnMobile}-mobile`]: sizeOnMobile,
        [`offset-${offsetOnMobile}-mobile`]: offsetOnMobile,
        // tablet
        [`is-${sizeOnTablet}-tablet`]: sizeOnTablet,
        [`offset-${offsetOnTablet}-tablet`]: offsetOnTablet,
        // touch
        [`is-${sizeOnTouch}-touch`]: sizeOnTouch,
        [`offset-${offsetOnTouch}-touch`]: offsetOnTouch,
        // desktop
        [`is-${sizeOnDesktop}-desktop`]: sizeOnDesktop,
        [`offset-${offsetOnDesktop}-desktop`]: offsetOnDesktop,
      })}
    >
      {children}
    </div>
  )
}
