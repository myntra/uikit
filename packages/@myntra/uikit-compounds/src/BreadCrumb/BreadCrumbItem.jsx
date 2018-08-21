import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'
import styles from './BreadCrumb.css'

/**
 A breadcrumb item
 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <BreadCrumb>
  <BreadCrumb.Item>
    <a href='#'>Second</a>
  </BreadCrumb.Item>
 </BreadCrumb>
 */
function BreadCrumbItem({ onClick, ...props }) {
  return (
    <li className={classnames('page').use(styles)} onClick={onClick}>
      {props.children}
    </li>
  )
}

BreadCrumbItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any
}

export default BreadCrumbItem
