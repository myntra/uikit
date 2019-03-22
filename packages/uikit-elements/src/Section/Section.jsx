import React from 'react'
import Proptypes from 'prop-types'
// eslint-disable-next-line
import { Button } from '@myntra/uikit-elements'
import classnames from './Section.module.css'

/**
 Section component.

 @since 0.7.0
 @status REVIEWING
 @example
<Section title={<h3>Gotta catch 'em all</h3>}>
  <Button type="link">Badges</Button>
  <Button type="secondary">Pokeballs</Button>
  <Button>Pokedex</Button>
  <div><p>
    I will travel across the land,<br />
    Searching far and wide.<br />
    Each Pokemon to understand<br />
    The power that's inside!<br />
    Pokemon!<br />
    Gotta catch em' all!</p>
  </div>
</Section>
 */
export default function Section({ title, nopadding, children }) {
  const actions = []
  const content = []
  React.Children.map(children, child => {
    if (child && child.type === Button) {
      actions.push(child)
    } else if (child) {
      content.push(child)
    }
  })
  return (
    <div className={classnames('section')}>
      {(title || actions) && (
        <div className={classnames('header')}>
          {title || <span />}
          <div className={classnames('actions')}>{actions}</div>
        </div>
      )}
      {content.length ? <div className={classnames('content', { nopadding })}>{content}</div> : null}
    </div>
  )
}

Section.propTypes = {
  /** Title of the Section */
  title: Proptypes.oneOfType([Proptypes.string, Proptypes.node]),
  /** Content of the Section */
  children: Proptypes.any,
  /** No padding for content */
  nopadding: Proptypes.bool
}

Section.defaultProps = {
  nopadding: false
}
