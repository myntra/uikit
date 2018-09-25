import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './Tab.module.css'

/**
 Tabs
 @since 0.3.0
 @status EXPERIMENTAL
 @example
  <Tabs>
  <Tab title="Tab 1">
    Anything here
  </Tab>

  <Tab title={<span><Icon name="alert" /> Tab 2</span>}>
    An image.

    <Image src="//picsum.photos/300" width={300} height={300} />
  </Tab>

  <Tab title="Tab 3">
    Content
  </Tab>
 </Tabs>
 */
function Tab({ isActive, title, ...props }) {
  return (
    <div {...props} className={classnames('tab', { active: isActive }).use(styles)}>
      {title}
    </div>
  )
}

Tab.propTypes = {
  /** Tab title */
  title: PropTypes.any.isRequired,
  /** contents */
  children: PropTypes.node,
  /** @private */
  onClick: PropTypes.func,
  /** @private */
  isActive: PropTypes.bool
}

export default Tab
