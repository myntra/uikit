import React from 'react'
import { classnames } from '@myntra/uikit-utils'
import PropTypes from 'prop-types'
import styles from './TopBarItem.module.css'
import Icon from '@myntra/uikit-elements/src/Icon/Icon'

/**
 A component for page header

 @since 0.3.0
 @status EXPERIMENTAL
 @example
 <TopBar.Item icon="user" altText="hello">
    Say Hello!
 </TopBar.Item>
 */
function TopBarItem({ icon, altText, onClick, className, children }) {
  return (
    <div className={classnames('item', className).use(styles)} onClick={onClick}>
      {icon ? <Icon name={icon} title={altText} className={classnames('icon').use(styles)} /> : null}
      {children}
    </div>
  )
}

TopBarItem.propTypes = {
  /** Icon name */
  icon: PropTypes.string,
  /** Event fired on click */
  onClick: PropTypes.func,
  /** Alternate text. Displayed on haver. */
  altText: PropTypes.string,
  children: PropTypes.any,
  /** @private */
  className: PropTypes.string
}

export default TopBarItem
