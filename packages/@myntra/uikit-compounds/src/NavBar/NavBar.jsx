import React from 'react'
import PropTypes from 'prop-types'
import { classnames } from '@myntra/uikit-utils'
import Icon from '@myntra/uikit-elements/src/Icon/Icon'
import NavItem from './NavItem'
import NavGroup from './NavGroup'
import styles from './NavBar.module.css'

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
    >
      <NavBar.Item title='Item1' href='abc' icon='cross'/>
      <NavBar.Group title='Group1'>
        <NavBar.Item title='Menu1' icon='cross'>
          <NavBar.Item title='Item2' href='xyz' icon='cross'/>
          <NavBar.Item title='Item3' href='mno' icon='cross'/>
        </NavBar.Item>
        <NavBar.Item title='Item4' href='pqr' icon='cross'/>
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
    onClick: PropTypes.func
  }

  static defaultProps = {
    expand: 'auto'
  }

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
    this.props.expand === 'auto' && this.setState({ collapsed: true })
  }

  handleClick = () => {
    const { expand } = this.props
    expand !== 'auto' && this.props.onClick && this.props.onClick({ expand: expand === 'open' ? 'close' : 'open' })
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
        className={classnames('nav', { collapsed }).use(styles)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <div className={classnames('title').use(styles)}>
          <div className={classnames('content').use(styles)}>
            <span className={classnames('icon').use(styles)}>{icon && <Icon name={icon} />}</span>
            <span hidden={collapsed}>{title}</span>
          </div>
        </div>
        <ul className={classnames('menu').use(styles)}>
          {React.Children.map(children, (navOption, i) => {
            return React.cloneElement(navOption, {
              key: i,
              optionIndex: i,
              onOpen: this.handleMenuOpen,
              open: this.state.expandedMenu === i,
              currentPath: currentPath,
              onSelect: this.handleOptionSelect,
              collapsed,
              linkComponent: linkComponent
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
