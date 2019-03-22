import React, { useContext } from 'react'
import { createContext } from '@myntra/uikit-context'
import NavBarContext from './context'
import classnames from './nav-bar-group.module.scss'
import NavBarItem, { NavBarItemProps } from './nav-bar-item'

interface NavBarGroupProps extends BaseProps, NavBarItemProps {
  /**
   * The title of the nav group.
   */
  title: string

  /**
   * List of nav links and groups. Only [NavBar.Group](#NavBarGroup) and [NavBar.Item](#NavBarItem) should be used here.
   */
  children: React.ReactNode

  /**
   * Internal nav item ID. Auto injected.
   *
   * @private
   */
  __$navId: number[]
}

interface NavBarGroupContext {
  depth: number
}

export const Context = createContext<NavBarGroupContext>({
  depth: 0
})

function injectNavId(children: any, id: number[]) {
  return React.Children.map(children, (child: any, index) =>
    child && child.type === NavBarGroup ? React.cloneElement(child, { __$navId: [...id, index] }) : child
  )
}

/**
 * A group of [links](#NavGroupItem) in the nav bar.
 *
 * This component should be used as a child of [NavBar](#NavBar) or other [NavBar.Group](#NavBarGroup) component.
 *
 * @since 0.3.0
 * @status EXPERIMENTAL
 * @category sub-component
 * @see http://uikit.myntra.com/components/nav-bar#NavBarGroup
 */
export default function NavBarGroup({ title, children, className, __$navId: id, ...props }: NavBarGroupProps) {
  function render(depth: number, setActiveGroup: any, isActiveGroup: (id: any) => boolean) {
    return depth > 0 ? (
      <NavBarItem
        {...props}
        data-is-nav-group={true}
        className={className}
        onActivation={event => {
          const li = event.target.closest('li')
          if (!li || !li.dataset.isNavGroup) return
          // Stop event propagation so parent NavBar.Group is not triggered.
          event.stopPropagation()
          // Toggle state of the NavBar.Group.
          isActiveGroup(id) ? setActiveGroup(id.slice(0, id.length - 1)) : setActiveGroup(id)
        }}
        aria-haspopup="true"
        aria-expanded={`${isActiveGroup(id)}`}
        tabIndex={0}
        role="button"
      >
        <div className={classnames('nav-group-title')}>{title}</div>
        {isActiveGroup(id) && (
          <Context.Provider value={{ depth: depth + 1 }}>
            <ul className={classnames('nav-group')}>{injectNavId(children, id)}</ul>
          </Context.Provider>
        )}
      </NavBarItem>
    ) : (
      <Context.Provider value={{ depth: depth + 1 }}>
        <ul className={classnames('nav-group', className)}>{injectNavId(children, id)}</ul>
      </Context.Provider>
    )
  }

  if (CAN_USE_HOOKS) {
    const { setActiveGroup, isActiveGroup } = useContext(NavBarContext)
    const { depth } = useContext(Context)

    return render(depth, setActiveGroup, isActiveGroup)
  } else {
    return (
      <NavBarContext.Consumer>
        {({ setActiveGroup, isActiveGroup }) => (
          <Context.Consumer>{({ depth }) => render(depth, setActiveGroup, isActiveGroup)}</Context.Consumer>
        )}
      </NavBarContext.Consumer>
    )
  }
}
