import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'

import styles from './Grid.module.css'
import GridColumn from './GridColumn'

/**
 It is a flexbox based layouting component.

 @since 0.0.0
 @status REVIEWING
 @example
<div class="grid-example">
<Grid>
  <Grid.Column><div>auto</div></Grid.Column>
  <Grid.Column size={4}><div>4</div></Grid.Column>
</Grid>
</div>
 */
function Grid(props) {
  const {
    className,
    children,
    gap,
    gapless,
    centered,
    hcentered,
    vcentered,
    multiline,
    allowAnyChild,
    ...forwardedProps
  } = props

  return (
    <div
      {...forwardedProps}
      className={classnames(
        'columns',
        className,
        { multiline, centered, hcentered, vcentered },
        (gap || gapless) && ['variable-gap', 'gap-' + (gap || 'none')]
      ).use(styles)}
    >
      {children}
    </div>
  )
}

Grid.propTypes = {
  /** @private */
  className: PropTypes.string,
  /** @private */
  children({ children, allowAnyChild }) {
    if (allowAnyChild) return
    React.Children.forEach(children, child => {
      if (child && child.type !== GridColumn) {
        throw new Error('Only Grid.Column component is allowed in Grid.')
      }
    })
  },
  /** Customize gap */
  gap: PropTypes.oneOf(['none', 'xx-small', 'x-small', 'small', 'base', 'large']),
  /** Remove gap between columns */
  gapless: PropTypes.bool,
  /** Wrap columns to next row */
  multiline: PropTypes.bool,
  /** Horizontally and Vertically center columns */
  centered: PropTypes.bool,
  /** Horizontally center columns */
  hcentered: PropTypes.bool,
  /** Vertically center columns */
  vcentered: PropTypes.bool,
  /** @private */
  allowAnyChild: PropTypes.bool
}

// Export `GridColumn` with `Grid` as they are tightly coupled components.
Grid.Column = GridColumn

export default Grid
