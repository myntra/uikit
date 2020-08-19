import { IconName } from '@myntra/uikit-component-icon'
import ExclamationTriangleSolid from '@myntra/uikit-icons/svgs/ExclamationTriangleSolid'
import ExclamationCircleSolid from '@myntra/uikit-icons/svgs/ExclamationCircleSolid'
import CheckCircleSolid from '@myntra/uikit-icons/svgs/CheckCircleSolid'

export const ICONS: Record<string, IconName> = {
  error: ExclamationTriangleSolid,
  warning: ExclamationCircleSolid,
  success: CheckCircleSolid,
}

export const RE_BACKWARD_COMPAT = /^(primary|info)$/
