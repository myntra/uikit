import React from 'react'
import PropTypes from 'prop-types'
import { onlyExtraProps } from '@myntra/uikit-utils'
import { Icon, Avatar } from '@myntra/uikit-elements'
import NavItem from './NavItem'
import NavGroup from './NavGroup'
import classnames from './NavBar.module.css'

/**
 Component for Navigation

 @since 0.3.0
 @status EXPERIMENTAL
 @example
  <div style={{backgroundColor: 'rgb(249, 249, 249)', height: '300px', position: 'relative'}}>
    <NavBar title='MYNTRA JABONG' icon='alert' currentPath={this.state.currentPath}
    expand={this.state.expand || 'open'}
    onChange={({href}) => this.setState({currentPath: href})}
    onClick={({expand}) => this.setState({expand})}
    style={{position: 'absolute', zIndex: 100 }}
    >
      <NavBar.Item title='Item1' href='abc' icon='times'/>
      <NavBar.Group title='Group1'>
        <NavBar.Item title='Menu1' icon='times'>
          <NavBar.Item title='Item2' href='xyz' icon='times'/>
          <NavBar.Item title='Item3' href='mno' icon='times'/>
        </NavBar.Item>
        <NavBar.Item title='Item4' href='pqr' icon='times'/>
      </NavBar.Group>
      <NavBar.Group>
        <NavBar.Item title='Item4' href='xyz1'/>
      </NavBar.Group>
    </NavBar>
  </div>
 */

class NavBar extends React.PureComponent {
  static propTypes = {
    /** List of navigation options */
    children: PropTypes.any,
    /** Title of the Nav Bar */
    title: PropTypes.string,
    /** Name of the title icon */
    icon: PropTypes.string,
    /** Link Component used for navigation
     * @function
     * @param {{ href: string, children: any }} props
     * @returns {React.Element}
     */
    linkComponent: PropTypes.func,
    /** Current URL */
    currentPath: PropTypes.string,
    /** onChange handler to update href */
    onChange: PropTypes.func,
    /** Expand behaviour */
    expand: PropTypes.oneOf(['auto', 'open', 'close']),
    /** onClick handler to expand/collapse the Nav bar  */
    onClick: PropTypes.func,
    /** Default check for whether a nav item is active
     * @function
     * @param {{ href: string, currentPath: string }} props
     * @returns {Boolean}
     */
    match: PropTypes.func
  }

  static defaultProps = {
    expand: 'auto'
  }

  static onlyExtraProps = onlyExtraProps(NavBar.propTypes)

  state = {
    expandedMenu: -1,
    collapsed: true
  }

  static getDerivedStateFromProps(props, state) {
    if (props.expand !== 'auto' && props.expand !== state.expand) {
      return { collapsed: props.expand === 'close' }
    }
    return null
  }

  handleMouseEnter = () => {
    this.props.expand === 'auto' && this.setState({ collapsed: false })
  }

  handleMouseLeave = () => {
    this.props.expand === 'auto' && this.setState({ collapsed: true, expandedMenu: -1 })
  }

  handleClick = () => {
    const { expand } = this.props

    expand !== 'auto' && this.props.onClick && this.props.onClick(expand === 'open' ? 'close' : 'open')
  }

  handleMenuOpen = optionIndex => {
    if (this.state.expandedMenu === optionIndex) {
      this.setState({ expandedMenu: -1 })
    } else {
      this.setState({ expandedMenu: optionIndex })
    }
  }

  handleOptionSelect = (href, menuIndex) => {
    if (this.props.currentPath !== href) {
      this.props.onChange && this.props.onChange({ href })
    }
  }

  render() {
    const { title, icon, children, currentPath, linkComponent } = this.props
    const collapsed = this.state.collapsed
    return (
      <nav
        {...NavBar.onlyExtraProps(this.props)}
        className={classnames('nav', { collapsed })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <div className={classnames('title')}>
          <div className={classnames('content')}>
            <span className={classnames('icon')}>{icon ? <Icon name={icon} /> : <Avatar name={title} />}</span>
            <span hidden={collapsed}>{title}</span>
          </div>
        </div>
        <ul className={classnames('menu')}>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              key: index,
              depth: 1,
              optionIndex: index,
              onOpen: this.handleMenuOpen,
              open: this.state.expandedMenu === index,
              currentPath: currentPath,
              onSelect: this.handleOptionSelect,
              collapsed,
              linkComponent: linkComponent,
              match: this.props.match
            })
          })}
        </ul>
      </nav>
    )
  }
}

NavBar.Item = NavItem
NavBar.Group = NavGroup

export default NavBar
