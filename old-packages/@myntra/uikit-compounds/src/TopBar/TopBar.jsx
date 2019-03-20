import React from 'react'

import PropTypes from 'prop-types'

import BreadCrumb from '../BreadCrumb/BreadCrumb.jsx'
import classnames from './TopBar.module.css'
import Item from './TopBarItem'
import { Grid } from '../index.js'

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
    <div className={classnames('top-bar')}>
      <Grid vcentered>
        <Grid.Column>
          <div className={classnames('head')}>
            <div className={classnames('content')}>
              <div className={classnames('content-left')}>
                <h1 className={classnames('title')}>{title}</h1>
                {crumb}
              </div>
              {slot.length ? <div className={classnames('embeds')}>{slot}</div> : null}
              <nav className={classnames('content-right')}>{items}</nav>
            </div>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  )
}

TopBar.propTypes = {
  /** App title */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.any
}

TopBar.Item = Item

export default TopBar
