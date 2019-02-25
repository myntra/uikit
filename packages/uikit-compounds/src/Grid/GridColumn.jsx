import React from 'react'
import PropTypes from 'prop-types'
import { onlyExtraProps } from '@myntra/uikit-utils'

import classnames from './Grid.module.css'

/**
 Sub component of `<Grid>`.

 __NOTE:__ It should be rendered in `<Grid>` component.

 @since 0.0.0
 @status REVIEWING
 @example
 <div class="grid-example">
  <Grid>
    <Grid.Column size={5}>
      <div>5 of 12</div>
    </Grid.Column>
  </Grid>
</div>
 */
export default function GridColumn(props) {
  return (
    <div
      {...forwardedProps(props)}
      className={classnames('column', props.className, {
        narrow: props.narrow,
        'narrow-mobile': props.narrowOnMobile,
        'narrow-tablet': props.narrowOnTablet,
        'narrow-touch': props.narrowOnTouch,
        'narrow-desktop': props.narrowOnDesktop,
        // all
        [`is-${props.size}`]: props.size,
        [`offset-${props.offset}`]: props.offset,
        // mobile
        [`is-${props.sizeOnMobile}-mobile`]: props.sizeOnMobile,
        [`offset-${props.offsetOnMobile}-mobile`]: props.offsetOnMobile,
        // tablet
        [`is-${props.sizeOnTablet}-tablet`]: props.sizeOnTablet,
        [`offset-${props.offsetOnTablet}-tablet`]: props.offsetOnTablet,
        // touch
        [`is-${props.sizeOnTouch}-touch`]: props.sizeOnTouch,
        [`offset-${props.offsetOnTouch}-touch`]: props.offsetOnTouch,
        // desktop
        [`is-${props.sizeOnDesktop}-desktop`]: props.sizeOnDesktop,
        [`offset-${props.offsetOnDesktop}-desktop`]: props.offsetOnDesktop
      })}
    >
      {props.children}
    </div>
  )
}

export const sizes = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  'full',
  'three-quarters',
  'two-thirds',
  'half',
  'one-third',
  'one-quarter',
  'one-fifth',
  'two-fifth',
  'three-fifth',
  'four-fifth'
]

GridColumn.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** @private */
  children: PropTypes.any,
  /** Take only required space */
  narrow: PropTypes.bool,
  /** Width */
  size: PropTypes.oneOf(sizes),
  /** Leaves empty space on left */
  offset: PropTypes.oneOf(sizes),
  /** Narrow on mobile screen */
  narrowOnMobile: PropTypes.bool,
  /** Width on mobile screen */
  sizeOnMobile: PropTypes.oneOf(sizes),
  /** Offset on mobiles screen */
  offsetOnMobile: PropTypes.oneOf(sizes),
  /** Narrow on tablet screen */
  narrowOnTablet: PropTypes.bool,
  /** Width on tablet screen */
  sizeOnTablet: PropTypes.oneOf(sizes),
  /** Offset on tablet screen */
  offsetOnTablet: PropTypes.oneOf(sizes),
  /** Narrow on touch enabled devices */
  narrowOnTouch: PropTypes.bool,
  /** Width on touch enabled devices */
  sizeOnTouch: PropTypes.oneOf(sizes),
  /** Offset on touch enabled devices */
  offsetOnTouch: PropTypes.oneOf(sizes),
  /** Narrow on desktop screen */
  narrowOnDesktop: PropTypes.bool,
  /** Width on desktop screen */
  sizeOnDesktop: PropTypes.oneOf(sizes),
  /** Offset on desktop screen */
  offsetOnDesktop: PropTypes.oneOf(sizes)
}

const forwardedProps = onlyExtraProps(GridColumn.propTypes)
