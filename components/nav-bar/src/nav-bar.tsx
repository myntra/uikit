import React, { PureComponent, useContext } from 'react'
import UIKitContext, { LinkProps } from '@myntra/uikit-context'
import NavBarContext from './context'
import NavBarGroup from './nav-bar-group'
import NavBarItem from './nav-bar-item'

import LogoMyntraJabong from './logos/myntra-jabong.png'

// TODO: Use click away to close NavBar (if mouse leave fails)

import classnames from './nav-bar.module.scss'

const LinkFromUIKitContext = ({ href, children }: LinkProps) => {
  if (CAN_USE_HOOKS) {
    const { RouterLink } = useContext(UIKitContext)

    return <RouterLink to={href}>{children}</RouterLink>
  }

  return (
    <UIKitContext.Consumer>
      {({ RouterLink }) => <RouterLink to={href}>{children}</RouterLink>}
    </UIKitContext.Consumer>
  )
}

interface NavBarProps extends BaseProps {
  /**
   * The title of the nav bar. Generally, it is the name of the application/product/company.
   */
  title: string

  /**
   * URL of the current page. NavBar uses `currentPath` for highlighting active nav links.
   */
  currentPath: string | any

  /**
   * Check if current path is active.
   *
   * @since 0.10.0
   */
  isActivePath?(navLinkPath: any, currentPath: any): boolean

  /**
   * Control NavBar state.
   */
  isOpen?: boolean

  /**
   * The [NavBar.Item](#NavBarItem) component renders an anchor tag (`<a>`).
   * This prop allows to override this behavior.
   *
   * @since 0.10.0
   */
  renderLink?(props: LinkProps): any

  /**
   * The callback fired when NavBar.Item is clicked.
   */
  onNavLinkClick?(link: { to: any }): void

  /**
   * The callback called when user clicks on the NavBar.
   */
  onClick?(event: MouseEvent): void

  /**
   * List of nav links and groups. Only [NavBar.Group](#NavBarGroup) and [NavBar.Item](#NavBarItem) should be used here.
   */
  children: React.ReactNode

  /**
   * @deprecated - Ambiguous prop name.
   */
  expand?: 'auto' | 'open' | 'close'

  /**
   * Match nav link with `currentPath`.
   *
   * @deprecated - Use [isActivePath](#NavBar-isActivePath) prop.
   */
  match?(args: { href: string; currentPath: string }): boolean

  /**
   * @deprecated - As NavBar does not control navigation, it should be handled by browser or any client-side router.
   */
  onChange?(href: string): void

  /**
   * @deprecated - Use [renderLink](#NavBar-renderLink) prop.
   */
  linkComponent?(props: { href: string; children: JSX.Element }): JSX.Element
}

const ROOT_NAV_GROUP_ID = [0]
/**
 * A sidebar nav list for app navigation.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category opinionated
 * @see http://uikit.myntra.com/components/nav-bar
 */
export default class NavBar extends PureComponent<
  NavBarProps,
  { isOpen: boolean; activeGroup: number[] }
> {
  // Sub-components
  static Group = NavBarGroup
  static Item = NavBarItem

  static defaultProps = {
    isActivePath(navLinkPath, currentPath) {
      return navLinkPath === currentPath
    },
    renderLink({ href, children }) {
      return <LinkFromUIKitContext href={href}>{children}</LinkFromUIKitContext>
    }
  }

  state = {
    isOpen: false,
    activeGroup: ROOT_NAV_GROUP_ID
  }

  idPrefix: string

  constructor(props) {
    super(props)

    this.idPrefix = `nav-${Date.now()}-`
  }

  get isOpen(): boolean {
    if (this.props.expand) {
      if (__DEV__)
        console.warn(`The prop 'expand' is deprecated. Use 'isOpen' instead.`)

      if (this.props.expand !== 'auto') return this.props.expand === 'open'
    }

    // Controlled NavBar
    if (typeof this.props.isOpen === 'boolean') return this.props.isOpen

    // Uncontrolled NavBar
    return this.state.isOpen
  }

  get renderLink() {
    if (this.props.linkComponent) {
      if (__DEV__)
        console.warn(
          `The prop 'linkComponent' is deprecated. Use 'renderLink' instead.`
        )

      return this.props.linkComponent
    }

    return this.props.renderLink
  }

  get isActivePath() {
    if (this.props.match) {
      if (__DEV__)
        console.warn(
          `The prop 'match' is deprecated. Use 'isActivePath' instead.`
        )

      return (href: string, currentPath: string) =>
        this.props.match({ href, currentPath })
    }

    return this.props.isActivePath
  }

  handleClick = (event: any) => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }

  handleMouseEnter = (event: any) => {
    this.open()
  }

  handleMouseLeave = (event: any) => {
    this.close()
  }

  handleFocus = (event: any) => {
    this.open()
  }

  handleBlur = (event: any) => {
    // DO NOT CLOSE ON BLUR.
  }

  open = () => {
    if (!this.state.isOpen) this.setState({ isOpen: true })
  }

  close = () => {
    if (this.state.isOpen)
      this.setState({ isOpen: false, activeGroup: ROOT_NAV_GROUP_ID })
  }

  handleNavLinkClick = (navLink: { path: string }) => {
    if (this.props.onChange) {
      if (__DEV__)
        console.warn(
          `The prop 'match' is deprecated. See http://uikit.myntra.com/components/nav-link#NavLink-onChange.`
        )

      this.props.onChange(navLink.path)
    }

    if (this.props.onNavLinkClick && navLink.path) {
      this.props.onNavLinkClick({ to: navLink.path })
    }
  }

  isActiveNavLinkPath = (navLinkPath: string): boolean => {
    return this.isActivePath(navLinkPath, this.props.currentPath)
  }

  setActiveGroup = (id: number[]) => {
    // debugger
    this.setState({ activeGroup: id })
  }

  isActiveGroup = (id: number[]) => {
    return (
      id.length <= this.state.activeGroup.length &&
      id.every((value, index) => value === this.state.activeGroup[index])
    )
  }

  get attrs() {
    const {
      children,
      currentPath,
      expand,
      isActivePath,
      isOpen,
      linkComponent,
      match,
      onChange,
      onClick,
      onNavLinkClick,
      renderLink,
      title,
      className,
      ...attrs
    } = this.props

    return attrs
  }

  render() {
    return (
      <NavBarContext.Provider
        value={{
          currentPath: this.props.currentPath,
          isActivePath: this.isActiveNavLinkPath,
          isActiveGroup: this.isActiveGroup,
          renderLink: this.renderLink,
          isOpen: this.isOpen,
          onNavLinkClick: this.handleNavLinkClick,
          setActiveGroup: this.setActiveGroup
        }}
      >
        <nav
          tabIndex={0}
          role="navigation"
          {...this.attrs}
          id={`${this.idPrefix}nav`}
          className={classnames('nav', this.props.className, {
            'is-open': this.isOpen
          })}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          labelled-by={`${this.idPrefix}header`}
        >
          <header
            id={`${this.idPrefix}header`}
            className={classnames('header')}
          >
            <img src={LogoMyntraJabong} alt="Myntra Jabong" />
            {this.props.title}
          </header>

          <NavBarGroup
            className={classnames('body')}
            title={this.props.title}
            __$navId={ROOT_NAV_GROUP_ID}
            key={ROOT_NAV_GROUP_ID.join('.')}
          >
            {this.props.children}
          </NavBarGroup>
        </nav>
      </NavBarContext.Provider>
    )
  }
}
