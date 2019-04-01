import { BaseProps as AbstractBaseProps } from './api'

declare global {
  var __DEV__: boolean
  var CAN_USE_HOOKS: boolean
  var CAN_USE_CONTEXT: boolean
  var CAN_USE_PORTAL: boolean
  var CAN_USE_FRAGMENT: boolean
  var CAN_USE_SUSPENSE: boolean
  interface BaseProps extends AbstractBaseProps {}
}
