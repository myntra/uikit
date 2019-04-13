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
export const InputS3File = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-s3-file' */ '@myntra/uikit-component-input-s3-file')
)
export const InputText = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-text' */ '@myntra/uikit-component-input-text')
)
export const List = asyncComponent(() =>
  import(/* webpackChunkName: 'components/list' */ '@myntra/uikit-component-list')
)
export const Measure = asyncComponent(() =>
  import(/* webpackChunkName: 'components/measure' */ '@myntra/uikit-component-measure')
)
export const NavBar = asyncComponent(() =>
  import(/* webpackChunkName: 'components/nav-bar' */ '@myntra/uikit-component-nav-bar')
)
export const Page = asyncComponent(() =>
  import(/* webpackChunkName: 'components/page' */ '@myntra/uikit-component-page')
)
export const Portal = asyncComponent(() =>
  import(/* webpackChunkName: 'components/portal' */ '@myntra/uikit-component-portal')
)
export const Progress = asyncComponent(() =>
  import(/* webpackChunkName: 'components/progress' */ '@myntra/uikit-component-progress')
)
export const Table = asyncComponent(() =>
  import(/* webpackChunkName: 'components/table' */ '@myntra/uikit-component-table')
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
    name: 'InputS3File',
    since: '0.11.0',
    status: 'READY',
    path: '/components/input-s3-file'
  },
  {
    name: 'InputText',
    since: '0.0.0',
    status: 'READY',
    path: '/components/input-text'
  },
  {
    name: 'List',
    since: '0.10.0',
    status: 'READY',
    path: '/components/list'
  },
  {
    name: 'Measure',
    since: '0.3.0',
    status: 'EXPERIMENTAL',
    path: '/components/measure'
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
    name: 'Table',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/table'
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
