import { createContext, LinkProps } from '@myntra/uikit-context/src'

export interface NavBarContext {
  isOpen: boolean,
  currentPath: string,
  isActivePath(navLinkPath: string): boolean
  isActiveGroup(id: number[]): boolean
  onNavLinkClick(navLink: {
    path: string
  }): void
  setActiveGroup(id: number[]): void
  renderLink(props: LinkProps): any
}

export default createContext<NavBarContext>({} as any)
