import React from 'react'
import PropTypes from 'prop-types'
import Icon from '@myntra/uikit-elements/src/Icon/Icon'
import styles from './NavItem.module.css'
import { classnames, memoize } from '@myntra/uikit-utils/src'

/**
 Component for Navigation Menu Group

 @since 0.3.0
 @status EXPERIMENTAL
 @example
  <NavBar.Item title='Dynamics' icon='alert' currentPath='NavBar' open={true}>
    <NavBar.Item title='Slash' href='slash' icon='cross' currentPath='glide' />
    <NavBar.Item title='Glide' href='glide' icon='spinner' currentPath='glide' />
  </NavBar.Item>
 */
export default class NavItem extends React.PureComponent {
  static propTypes = {
    /** Title of the Nav Item */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Icon URL */
    icon: PropTypes.string,
    /** @private List of items in the Nav Menu */
    children({ children }) {
      React.Children.forEach(children, child => {
        if (child.type !== NavItem) {
          throw new Error('Only Nav.Item component is allowed inside Nav.Item.')
        }
      })
    },
    /** url of the nav item */
    href: PropTypes.string,
    /** @private Menu is expanded */
    open: PropTypes.bool,
    /** @private Handler to open Menu */
    onOpen: PropTypes.func,
    /** @private Index of the Menu in the Nav bar */
    optionIndex: PropTypes.number,
    /** @private Option select handler */
    onSelect: PropTypes.func,
    /** @private Current selected Path */
    currentPath: PropTypes.string,
    /** @private Whether Nav Bar is collapsed */
    collapsed: PropTypes.bool,
    /** @private Link component for navigation */
    linkComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  }

  static defaultProps = {
    href: '#',
    linkComponent: 'a'
  }

  handleClick = event => {
    if (this.isMenu) {
      this.props.onOpen && this.props.onOpen(this.props.optionIndex)
    } else {
      this.props.onSelect && this.props.onSelect(this.props.href)
    }
  }

  getActive = memoize(({ currentPath, children, href }) => {
    let active = false
    if (!this.isMenu) {
      return currentPath === href
    }
    React.Children.forEach(children, navItem => {
      if (navItem.props.href === currentPath) {
        active = true
      }
    })
    return active
  })

  getIsMenu = memoize(({ children }) => {
    return React.Children.count(children) > 0
  })

  get isMenu() {
    return this.getIsMenu(this.props)
  }
  get active() {
    return this.getActive(this.props)
  }

  render() {
    const { title, icon, children, open, collapsed, linkComponent, href } = this.props
    const isMenu = this.isMenu
    const ItemComponent = isMenu ? 'div' : linkComponent
    const isMenuActive = isMenu && this.active
    return (
      <li>
        <ItemComponent href={href}>
          <div
            onClick={this.handleClick}
            className={classnames('item', { active: isMenuActive || this.active, 'is-menu': isMenu, collapsed }).use(
              styles
            )}
          >
            {icon ? (
              <div className={classnames('icon').use(styles)}>
                <Icon name={icon} />
              </div>
            ) : null}
            <span hidden={collapsed} className={classnames('title').use(styles)}>
              {title}
            </span>
          </div>
        </ItemComponent>
        {isMenu && (
          <ul hidden={!open || collapsed} className={classnames('menu').use(styles)}>
            {React.Children.map(children, (navItem, i) => {
              return React.cloneElement(navItem, {
                key: `menu-item-${i}`,
                onSelect: this.props.onSelect,
                currentPath: this.props.currentPath,
                linkComponent
              })
            })}
          </ul>
        )}
      </li>
    )
  }
}
