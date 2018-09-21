import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'

import BreadCrumb from '../BreadCrumb/BreadCrumb.jsx'
import styles from './TopBar.module.css'
import Item from './TopBarItem'
import { Grid } from '..'

/**
 A component for page header

 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <TopBar
    title="Application Name"
 >
    <BreadCrumb>
      <BreadCrumb.Item>First</BreadCrumb.Item>
      <BreadCrumb.Item><a href='#'>Second</a></BreadCrumb.Item>
    </BreadCrumb>
    <TopBar.Item icon="messages" />
    <TopBar.Item icon="user" />
    <TopBar.Item icon="notifications" />
 </TopBar>
 */
function TopBar({ title, children }) {
  const crumb = []
  const slot = []
  const items = []

  React.Children.forEach(children, child => {
    if (child.type === BreadCrumb) {
      crumb.push(child)
    } else if (child.type === Item) {
      items.push(child)
    } else {
      slot.push(child)
    }
  })

  return (
    <div className={classnames('top-bar').use(styles)}>
      <Grid vcentered>
        <Grid.Column>
          <div className={classnames('head').use(styles)}>
            <div className={classnames('content').use(styles)}>
              <div className={classnames('content-left').use(styles)}>
                <h1 className={classnames('title').use(styles)}>{title}</h1>
                {crumb}
              </div>
              {slot.length ? <div className={classnames('embeds').use(styles)}>{slot}</div> : null}
              <nav className={classnames('content-right').use(styles)}>{items}</nav>
            </div>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  )
}

TopBar.propTypes = {
  /** App title */
  title: PropTypes.string.isRequired,
  children: PropTypes.any
}

TopBar.Item = Item

export default TopBar
