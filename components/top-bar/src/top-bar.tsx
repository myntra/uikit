import React, { PureComponent, isValidElement, ReactElement } from 'react'
import BreadCrumb from '@myntra/uikit-component-bread-crumb'
import Dropdown from '@myntra/uikit-component-dropdown'
import List from '@myntra/uikit-component-list'
import classnames from './top-bar.module.scss'
import Item from './top-bar-item'
import Icon from '@myntra/uikit-component-icon'
import { isReactNodeType } from '@myntra/uikit-utils'

export interface TopBarProps extends BaseProps {
  title: string
  user: Partial<{ name: string; photo: string }> & { email: string }
}

/**
 * A component for page header
 *
 * @since 0.3.0
 * @status READY
 * @category basic
 * @see http://uikit.myntra.com/components/top-bar
 */
export default class TopBar extends PureComponent<
  TopBarProps,
  { isOpen: boolean }
> {
  static Item = Item

  state = {
    isOpen: false,
  }

  handleOpen = () => this.setState({ isOpen: true })
  handleClose = () => this.setState({ isOpen: false })

  render() {
    const { children, className, title, user, ...props } = this.props
    const breadcrumbs = []
    const actions = []
    const others = []

    React.Children.forEach(children, (child) => {
      if (isReactNodeType(child, BreadCrumb)) {
        breadcrumbs.push(child)
      } else if (isReactNodeType(child, Item)) {
        actions.push(child)
      } else {
        others.push(child)
      }
    })

    return (
      <div {...props} className={classnames('top-bar', className)}>
        <div className={classnames('title')}>
          <h1>{title}</h1>
          {breadcrumbs}
        </div>
        <div className={classnames('container')}>{others}</div>
        <nav className={classnames('nav')}>
          <Dropdown
            down
            right
            container
            isOpen={this.state.isOpen}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            renderTrigger={(props) => (
              <div className={classnames('user')} {...props}>
                {user.photo ? (
                  <img
                    className={classnames('user-avatar', 'photo')}
                    src={user.photo}
                  />
                ) : (
                  <Icon
                    className={classnames('user-avatar')}
                    name="user-circle"
                  />
                )}
                <div className={classnames('user-name')}>
                  {user.name
                    ? `${user.name} ${user.email ? `(${user.email})` : ''}`
                    : user.email}
                </div>
                {actions.length ? (
                  <Icon
                    name={this.state.isOpen ? 'chevron-up' : 'chevron-down'}
                  />
                ) : null}
              </div>
            )}
          >
            <List
              className={classnames('menu')}
              items={actions}
              idForItem={(item) => actions.indexOf(item)}
            >
              {({ item }) => item}
            </List>
          </Dropdown>
        </nav>
      </div>
    )
  }
}
