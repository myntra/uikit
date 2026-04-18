import { AlertTagProps } from './alert-tag'
import { IconName } from '@applique-ui/icon'
import { ReactNode } from 'react'

export const MENU_TYPES = {
  MENU: 'MENU',
  MENU_ITEM: 'MENU_ITEM',
  MENU_DIRECT_LINK: 'MENU_DIRECT_LINK',
}

export const HOVER_MENU_COLUMN_BUCKET = {
  COLUMN_1: 0,
  COLUMN_2: 1,
  COLUMN_3: 2,
  COLUMN_4: 3,
}

export const QUICKLINK_BUTTON_TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
}

export interface ROUTING_INFO_INTERFACE {
  path: string
  handleClick?: Function
  meta: Object
}

export interface NAVIGATION_ITEM_L1_INTERFACE extends Partial<AlertTagProps> {
  label: string
  icon: ReactNode
  routingInfo?: ROUTING_INFO_INTERFACE
  noHover: boolean
  config?: Array<NAVIGATION_ITEM_L2_INTERFACE>
  dispatchFunctionObject?: Function
  footerMessage?: string
}

export interface NAVIGATION_ITEM_L2_INTERFACE extends Partial<AlertTagProps> {
  id: string
  title: string
  type: string
  config: Array<NAVIGATION_ITEM_L3_INTERFACE>
  path: string
  routingInfo?: ROUTING_INFO_INTERFACE
}

export interface NAVIGATION_ITEM_L3_INTERFACE extends Partial<AlertTagProps> {
  id: string
  title: string
  routingInfo?: ROUTING_INFO_INTERFACE
}

export interface TopNavBaseProps extends BaseProps {
  config: {
    quickLinks: any
    logo: ReactNode
    navigationConfig: Array<NAVIGATION_ITEM_L1_INTERFACE>
    quickLinksSideNav?: Array<NAVIGATION_ITEM_L1_INTERFACE>
  }
  dispatchFunction: Function
  additionalHeader?: ReactNode
}

export interface TopNavProps extends TopNavBaseProps {
  hamburger?: IconName
  close?: IconName
  navigationKey: String
  currentNavigationValue: String
}

export interface DesktopProps extends TopNavBaseProps {
  children: any
  levelOneId: string
  levelTwoId: string
  levelThreeId: string
}
export interface MobileProps extends DesktopProps {
  hamburger?: IconName
  close?: IconName
}
