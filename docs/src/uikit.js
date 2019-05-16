import { lazy } from 'react'
function asyncComponent(factory) {
  const Component = lazy(factory)

  return new Proxy(Component, {
    get(target, name) {
      if (typeof name === 'string' && /^[A-Z]/.test(name)) {
        const result = Component._result

        return Component._status === 1
          ? result[name]
          : lazy(async () => {
              const { default: Component } = await factory()

              return { __esModule: true, default: Component[name] }
            })
      }

      return target[name]
    }
  })
}
export const Alert = asyncComponent(() =>
  import(/* webpackChunkName: 'components/alert' */ '@myntra/uikit-component-alert')
)
export const Avatar = asyncComponent(() =>
  import(/* webpackChunkName: 'components/avatar' */ '@myntra/uikit-component-avatar')
)
export const Badge = asyncComponent(() =>
  import(/* webpackChunkName: 'components/badge' */ '@myntra/uikit-component-badge')
)
export const BreadCrumb = asyncComponent(() =>
  import(/* webpackChunkName: 'components/bread-crumb' */ '@myntra/uikit-component-bread-crumb')
)
export const Button = asyncComponent(() =>
  import(/* webpackChunkName: 'components/button' */ '@myntra/uikit-component-button')
)
export const ClickAway = asyncComponent(() =>
  import(/* webpackChunkName: 'components/click-away' */ '@myntra/uikit-component-click-away')
)
export const Dropdown = asyncComponent(() =>
  import(/* webpackChunkName: 'components/dropdown' */ '@myntra/uikit-component-dropdown')
)
export const ErrorBoundary = asyncComponent(() =>
  import(/* webpackChunkName: 'components/error-boundary' */ '@myntra/uikit-component-error-boundary')
)
export const Field = asyncComponent(() =>
  import(/* webpackChunkName: 'components/field' */ '@myntra/uikit-component-field')
)
export const Grid = asyncComponent(() =>
  import(/* webpackChunkName: 'components/grid' */ '@myntra/uikit-component-grid')
)
export const Group = asyncComponent(() =>
  import(/* webpackChunkName: 'components/group' */ '@myntra/uikit-component-group')
)
export const Icon = asyncComponent(() =>
  import(/* webpackChunkName: 'components/icon' */ '@myntra/uikit-component-icon')
)
export const Image = asyncComponent(() =>
  import(/* webpackChunkName: 'components/image' */ '@myntra/uikit-component-image')
)
export const InputCheckbox = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-checkbox' */ '@myntra/uikit-component-input-checkbox')
)
export const InputDate = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-date' */ '@myntra/uikit-component-input-date')
)
export const InputMasked = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-masked' */ '@myntra/uikit-component-input-masked')
)
export const InputMonth = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-month' */ '@myntra/uikit-component-input-month')
)
export const InputNumber = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-number' */ '@myntra/uikit-component-input-number')
)
export const InputS3File = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-s3-file' */ '@myntra/uikit-component-input-s3-file')
)
export const InputSelect = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-select' */ '@myntra/uikit-component-input-select')
)
export const InputText = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-text' */ '@myntra/uikit-component-input-text')
)
export const InputTextArea = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-text-area' */ '@myntra/uikit-component-input-text-area')
)
export const List = asyncComponent(() =>
  import(/* webpackChunkName: 'components/list' */ '@myntra/uikit-component-list')
)
export const Loader = asyncComponent(() =>
  import(/* webpackChunkName: 'components/loader' */ '@myntra/uikit-component-loader')
)
export const Measure = asyncComponent(() =>
  import(/* webpackChunkName: 'components/measure' */ '@myntra/uikit-component-measure')
)
export const Modal = asyncComponent(() =>
  import(/* webpackChunkName: 'components/modal' */ '@myntra/uikit-component-modal')
)
export const NavBar = asyncComponent(() =>
  import(/* webpackChunkName: 'components/nav-bar' */ '@myntra/uikit-component-nav-bar')
)
export const Page = asyncComponent(() =>
  import(/* webpackChunkName: 'components/page' */ '@myntra/uikit-component-page')
)
export const Pagination = asyncComponent(() =>
  import(/* webpackChunkName: 'components/pagination' */ '@myntra/uikit-component-pagination')
)
export const Portal = asyncComponent(() =>
  import(/* webpackChunkName: 'components/portal' */ '@myntra/uikit-component-portal')
)
export const Progress = asyncComponent(() =>
  import(/* webpackChunkName: 'components/progress' */ '@myntra/uikit-component-progress')
)
export const Section = asyncComponent(() =>
  import(/* webpackChunkName: 'components/section' */ '@myntra/uikit-component-section')
)
export const Table = asyncComponent(() =>
  import(/* webpackChunkName: 'components/table' */ '@myntra/uikit-component-table')
)
export const Tooltip = asyncComponent(() =>
  import(/* webpackChunkName: 'components/tooltip' */ '@myntra/uikit-component-tooltip')
)
export const TopBar = asyncComponent(() =>
  import(/* webpackChunkName: 'components/top-bar' */ '@myntra/uikit-component-top-bar')
)
export const VirtualGrid = asyncComponent(() =>
  import(/* webpackChunkName: 'components/virtual-grid' */ '@myntra/uikit-component-virtual-grid')
)
export const VirtualList = asyncComponent(() =>
  import(/* webpackChunkName: 'components/virtual-list' */ '@myntra/uikit-component-virtual-list')
)
export const META = [
  {
    name: 'Alert',
    since: '0.3.0',
    status: 'READY',
    path: '/components/alert'
  },
  {
    name: 'Avatar',
    since: '0.3.1',
    status: 'EXPERIMENTAL',
    path: '/components/avatar'
  },
  {
    name: 'Badge',
    since: '0.8.0',
    status: 'EXPERIMENTAL',
    path: '/components/badge'
  },
  {
    name: 'BreadCrumb',
    since: '0.3.0',
    status: 'READY',
    path: '/components/bread-crumb'
  },
  {
    name: 'Button',
    since: '0.0.0',
    status: 'READY',
    path: '/components/button'
  },
  {
    name: 'ClickAway',
    since: '0.0.0',
    status: 'REVIEWING',
    path: '/components/click-away'
  },
  {
    name: 'Dropdown',
    since: '0.0.0',
    status: 'READY',
    path: '/components/dropdown'
  },
  {
    name: 'ErrorBoundary',
    since: '0.0.0',
    status: 'REVIEWING',
    path: '/components/error-boundary'
  },
  {
    name: 'Field',
    since: '0.6.0',
    status: 'EXPERIMENTAL',
    path: '/components/field'
  },
  {
    name: 'Grid',
    since: '0.0.0',
    status: 'REVIEWING',
    path: '/components/grid'
  },
  {
    name: 'Group',
    since: '0.11.0',
    status: 'EXPERIMENTAL',
    path: '/components/group'
  },
  {
    name: 'Icon',
    since: '0.0.0',
    status: 'REVIEWING',
    path: '/components/icon'
  },
  {
    name: 'Image',
    since: '0.3.0',
    status: 'EXPERIMENTAL',
    path: '/components/image'
  },
  {
    name: 'InputCheckbox',
    since: '0.0.0',
    status: 'READY',
    path: '/components/input-checkbox'
  },
  {
    name: 'InputDate',
    path: '/components/input-date'
  },
  {
    name: 'InputMasked',
    since: '0.0.0',
    status: 'REVIEWING',
    path: '/components/input-masked'
  },
  {
    name: 'InputMonth',
    since: '0.7.0',
    status: 'EXPERIMENTAL',
    path: '/components/input-month'
  },
  {
    name: 'InputNumber',
    since: '0.0.0',
    status: 'REVIEWING',
    path: '/components/input-number'
  },
  {
    name: 'InputS3File',
    since: '0.11.0',
    status: 'READY',
    path: '/components/input-s3-file'
  },
  {
    name: 'InputSelect',
    since: '0.0.0',
    status: 'READY',
    path: '/components/input-select'
  },
  {
    name: 'InputText',
    since: '0.0.0',
    status: 'READY',
    path: '/components/input-text'
  },
  {
    name: 'InputTextArea',
    since: '0.0.0',
    status: 'READY',
    path: '/components/input-text-area'
  },
  {
    name: 'List',
    since: '0.11.0',
    status: 'READY',
    path: '/components/list'
  },
  {
    name: 'Loader',
    since: '0.5.0',
    status: 'EXPERIMENTAL',
    path: '/components/loader'
  },
  {
    name: 'Measure',
    since: '0.3.0',
    status: 'EXPERIMENTAL',
    path: '/components/measure'
  },
  {
    name: 'Modal',
    since: '0.3.0',
    status: 'EXPERIMENTAL',
    path: '/components/modal'
  },
  {
    name: 'NavBar',
    since: '0.3.0',
    status: 'EXPERIMENTAL',
    path: '/components/nav-bar'
  },
  {
    name: 'Page',
    since: '0.11.0',
    status: 'READY',
    path: '/components/page'
  },
  {
    name: 'Pagination',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/pagination'
  },
  {
    name: 'Portal',
    since: '0.0.0',
    status: 'REVIEWING',
    path: '/components/portal'
  },
  {
    name: 'Progress',
    since: '0.6.0',
    status: 'READY',
    path: '/components/progress'
  },
  {
    name: 'Section',
    since: '0.7.0',
    status: 'REVIEWING',
    path: '/components/section'
  },
  {
    name: 'Table',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/table'
  },
  {
    name: 'Tooltip',
    since: '0.6.0',
    status: 'EXPERIMENTAL',
    path: '/components/tooltip'
  },
  {
    name: 'TopBar',
    since: '0.3.0',
    status: 'READY',
    path: '/components/top-bar'
  },
  {
    name: 'VirtualGrid',
    since: '0.8.0',
    status: 'READY',
    path: '/components/virtual-grid'
  },
  {
    name: 'VirtualList',
    since: '0.7.0',
    status: 'READY',
    path: '/components/virtual-list'
  }
]
