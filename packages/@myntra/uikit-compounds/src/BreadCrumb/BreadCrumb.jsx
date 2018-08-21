import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'
import styles from './BreadCrumb.module.css'
import BreadCrumbItem from './BreadCrumbItem'

/**
 The BreadCrumb component.
 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <BreadCrumb>
  <BreadCrumb.Item onClick={()=>{}}>First</BreadCrumb.Item>
  <BreadCrumb.Item><a href='#'>Second</a></BreadCrumb.Item>
 </BreadCrumb>
 */
function BreadCrumb(props) {
  return (
    <nav className={classnames('pages').use(styles)}>
      <ol>{props.children}</ol>
    </nav>
  )
}

BreadCrumb.propTypes = {
  children: PropTypes.any
}

BreadCrumb.Item = BreadCrumbItem

export default BreadCrumb
