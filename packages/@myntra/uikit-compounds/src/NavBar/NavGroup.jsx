import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import styles from './NavGroup.module.css'
import NavItem from './NavItem'

/**
 Component for Navigation Separator Head

 @since 0.3.0
 @status EXPERIMENTAL
 @example
  <NavBar.Group title='Nav Group' />
 */
export default class NavGroup extends React.PureComponent {
  static propTypes = {
    /** Title of the Nav Item */
    title: PropTypes.string,
    /** @private Whether Nav Bar is collapsed */
    collapsed: PropTypes.bool,
    /** @private Nav group items */
    children({ children }) {
      React.Children.forEach(children, child => {
        if (child.type !== NavItem) {
          throw new Error('Only NavItem component is allowed inside NavGroup.')
        }
      })
    }
  }

  render() {
    const { title, children, collapsed, ...props } = this.props
    return (
      <li className={classnames('group', { collapsed }).use(styles)}>
        <div className={classnames('title').use(styles)}>{collapsed ? null : title}</div>
        <ul className={classnames('items').use(styles)} hidden={collapsed}>
          {React.Children.map(children, navGroupItem => {
            return React.cloneElement(navGroupItem, { ...props, collapsed })
          })}
        </ul>
      </li>
    )
  }
}
