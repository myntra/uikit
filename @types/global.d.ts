import { BaseProps as AbstractBaseProps } from './api'

declare global {
  const __DEV__: boolean
  const CAN_USE_HOOKS: boolean
  const CAN_USE_CONTEXT: boolean
  const CAN_USE_PORTAL: boolean
  const CAN_USE_FRAGMENT: boolean
  const CAN_USE_SUSPENSE: boolean
  interface BaseProps extends AbstractBaseProps {}
}
