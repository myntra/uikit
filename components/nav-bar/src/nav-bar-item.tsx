import React, { useContext } from 'react'
import Icon, { IconName } from '@myntra/uikit-component-icon'
import classnames from './nav-bar-item.module.scss'
import Context, { NavBarContext } from './context'

export interface NavBarItemProps extends BaseProps {
  /**
   * The title of the link.
   */
  children: React.ReactNode

  /**
   * The location of the linked page.
   */
  to?: string | any

  /**
   * The name of the icon (displayed on left side of title).
   */
  icon?: IconName

  /**
   * Render a custom [Icon](/components/icon) or an [Avatar](/components/avatar).
   */
  renderIcon?(): React.ReactNode

  /**
   * The callback fired on item click or press.
   *
   * @private
   */
  onActivation?: (event: Event | any) => void
}

/**
 * A component to display links in the nav.
 *
 * This component should be used as a child of [NavBar](#NavBar) or [NavBar.Group](#NavBarGroup) component.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category sub-component
 * @see http://uikit.myntra.com/components/nav-bar#NavBarItem
 */
export default function NavBarItem({
  to,
  icon,
  renderIcon,
  children,
  className,
  onActivation,
  ...props
}: NavBarItemProps) {
  // TODO: add aria-current="page".
  // TODO: use renderLink prop from context.
  // TODO: Upgrade to use callback.

  const render = ({ onNavLinkClick, isActivePath, renderLink }: NavBarContext) => (
    <li
      onClick={
        (onActivation || onNavLinkClick) &&
        (event => {
          if (onActivation) onActivation(event)
          if (onNavLinkClick) onNavLinkClick(event as any)
        })
      }
      onKeyDown={
        onActivation &&
        (event => {
          if (event.key === 'Space' || event.key === 'Enter') {
            // Prevent scrolling if the Space key is pressed.
            event.preventDefault()
            // Stop event propagation otherwise NavBar.Item inside NavBar.Group
            // can expand/collapse parent NavBar.Group.
            event.stopPropagation()
            onActivation(event)
          }
        })
      }
      {...props}
      className={classnames('nav-item', className, { 'is-active': to && isActivePath(to) })}
    >
      <div className={classnames('icon')}>{renderIcon ? renderIcon() : icon ? <Icon name={icon} /> : null}</div>
      {to ? renderLink({ href: to, children }) : children}
    </li>
  )

  if (CAN_USE_HOOKS) {
    const context = useContext(Context)

    return render(context)
  } else {
    return <Context.Consumer>{context => render(context)}</Context.Consumer>
  }
}
