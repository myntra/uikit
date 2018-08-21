import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'

import BreadCrumb from '../BreadCrumb/BreadCrumb.jsx'
import styles from './TopBar.module.css'
import Item from './TopBarItem'

/**
 A component for page header

 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <TopBar
    title="Application Name"
    crumb={
      <BreadCrumb>
        <BreadCrumb.Item>First</BreadCrumb.Item>
        <BreadCrumb.Item><a href='#'>Second</a></BreadCrumb.Item>
      </BreadCrumb>
    }
 >
    <TopBar.Item icon="user" altText="hello" />
    <TopBar.Item icon="messages" />
    <TopBar.Item icon="notifications" />
 </TopBar>
 */
function TopBar({ title, slot, crumb, children }) {
  return (
    <div className={classnames('head').use(styles)}>
      <div className={classnames('content').use(styles)}>
        <div className={classnames('content-left').use(styles)}>
          <h1 className={classnames('title').use(styles)}>{title}</h1>
          {crumb}
        </div>
        {slot && <div className={classnames('embeds').use(styles)}>{slot}</div>}
        <nav className={classnames('content-right').use(styles)}>{children}</nav>
      </div>
    </div>
  )
}

TopBar.propTypes = {
  /** App title */
  title: PropTypes.string.isRequired,
  /** [BreadCrumb](./BreadCrumb) links. */
  crumb: PropTypes.node,
  slot: PropTypes.node,
  children: PropTypes.any,
  /** @private */
  _validate({ crumb, children }) {
    if (crumb && crumb.type !== BreadCrumb) {
      console.warn('UIKit: Use `BreadCrumb` component for rendering breadcrumbs.')
    }
    React.Children.forEach(children, child => {
      if (child && child.type !== Item) {
        throw new Error('Only TopBar.Item component is allowed in TopBar')
      }
    })
  }
}

TopBar.Item = Item

export default TopBar
