import { lazy } from 'react'
import * as uikitIcons from '@myntra/uikit-icons'

function asyncComponent(factory) {
  const Component = lazy(factory)
  const cache = {}

  return new Proxy(Component, {
    get(target, name) {
      if (typeof name === 'string' && /^[A-Z]/.test(name)) {
        // const result = Component._result

        return (
          cache[name] ||
          (cache[name] = lazy(async () => {
            const { default: Component } = await factory()

            return { __esModule: true, default: Component[name] }
          }))
        )
      }

      return target[name]
    }
  })
}
export const Accordion = asyncComponent(() =>
  import(/* webpackChunkName: 'components/accordion' */ '@myntra/uikit-component-accordion')
)
export const Avatar = asyncComponent(() =>
  import(/* webpackChunkName: 'components/avatar' */ '@myntra/uikit-component-avatar')
)
export const Badge = asyncComponent(() =>
  import(/* webpackChunkName: 'components/badge' */ '@myntra/uikit-component-badge')
)
export const Banner = asyncComponent(() =>
  import(/* webpackChunkName: 'components/banner' */ '@myntra/uikit-component-banner')
)
export const BreadCrumb = asyncComponent(() =>
  import(/* webpackChunkName: 'components/bread-crumb' */ '@myntra/uikit-component-bread-crumb')
)
export const Button = asyncComponent(() =>
  import(/* webpackChunkName: 'components/button' */ '@myntra/uikit-component-button')
)
export const ButtonGroup = asyncComponent(() =>
  import(/* webpackChunkName: 'components/button-group' */ '@myntra/uikit-component-button-group')
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
export const Fab = asyncComponent(() => import(/* webpackChunkName: 'components/fab' */ '@myntra/uikit-component-fab'))
export const Field = asyncComponent(() =>
  import(/* webpackChunkName: 'components/field' */ '@myntra/uikit-component-field')
)
export const Flex = asyncComponent(() =>
  import(/* webpackChunkName: 'components/flex' */ '@myntra/uikit-component-flex')
)
export const Form = asyncComponent(() =>
  import(/* webpackChunkName: 'components/form' */ '@myntra/uikit-component-form')
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
export const InputAzureFile = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-azure-file' */ '@myntra/uikit-component-input-azure-file')
)
export const InputCheckbox = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-checkbox' */ '@myntra/uikit-component-input-checkbox')
)
export const InputDate = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-date' */ '@myntra/uikit-component-input-date')
)
export const InputFile = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-file' */ '@myntra/uikit-component-input-file')
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
export const InputRadio = asyncComponent(() =>
  import(/* webpackChunkName: 'components/input-radio' */ '@myntra/uikit-component-input-radio')
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
export const JobTracker = asyncComponent(() =>
  import(/* webpackChunkName: 'components/job-tracker' */ '@myntra/uikit-component-job-tracker')
)
export const Layout = asyncComponent(() =>
  import(/* webpackChunkName: 'components/layout' */ '@myntra/uikit-component-layout')
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
export const Notification = asyncComponent(() =>
  import(/* webpackChunkName: 'components/notification' */ '@myntra/uikit-component-notification')
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
export const SchemaForm = asyncComponent(() =>
  import(/* webpackChunkName: 'components/schema-form' */ '@myntra/uikit-component-schema-form')
)
export const Section = asyncComponent(() =>
  import(/* webpackChunkName: 'components/section' */ '@myntra/uikit-component-section')
)
export const Stepper = asyncComponent(() =>
  import(/* webpackChunkName: 'components/stepper' */ '@myntra/uikit-component-stepper')
)
export const Table = asyncComponent(() =>
  import(/* webpackChunkName: 'components/table' */ '@myntra/uikit-component-table')
)
export const Tabs = asyncComponent(() =>
  import(/* webpackChunkName: 'components/tabs' */ '@myntra/uikit-component-tabs')
)
export const Text = asyncComponent(() =>
  import(/* webpackChunkName: 'components/text' */ '@myntra/uikit-component-text')
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
export const Tab = asyncComponent(() =>
  import('@myntra/uikit-component-tabs').then(m => ({ default: m.Tab, __esModule: true }))
)
export const UikitIcons = uikitIcons

export const META = [
  {
    name: 'Accordion',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/accordion'
  },
  {
    name: 'Avatar',
    since: '0.3.1',
    status: 'REVIEWING',
    path: '/components/avatar'
  },
  {
    name: 'Badge',
    since: '0.8.0',
    status: 'REVIEWING',
    path: '/components/badge'
  },
  {
    name: 'Banner',
    since: '1.6.0',
    status: 'READY',
    path: '/components/banner'
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
    name: 'ButtonGroup',
    since: '1.0.0',
    status: 'EXPERIMENTAL',
    path: '/components/button-group'
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
    name: 'Fab',
    since: '1.13.20',
    status: 'REVIEWING',
    path: '/components/fab'
  },
  {
    name: 'Field',
    since: '0.6.0',
    status: 'REVIEWING',
    path: '/components/field'
  },
  {
    name: 'Flex',
    since: '0.3.0',
    status: 'DEPRECATED',
    path: '/components/flex'
  },
  {
    name: 'Form',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/form'
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
    status: 'DEPRECATED',
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
    status: 'REVIEWING',
    path: '/components/image'
  },
  {
    name: 'InputAzureFile',
    since: '1.5.4',
    status: 'READY',
    path: '/components/input-azure-file'
  },
  {
    name: 'InputCheckbox',
    since: '0.0.0',
    status: 'READY',
    path: '/components/input-checkbox'
  },
  {
    name: 'InputDate',
    since: '0.0.0',
    status: 'READY',
    path: '/components/input-date'
  },
  {
    name: 'InputFile',
    since: '1.1.0',
    status: 'READY',
    path: '/components/input-file'
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
    status: 'REVIEWING',
    path: '/components/input-month'
  },
  {
    name: 'InputNumber',
    since: '0.0.0',
    status: 'REVIEWING',
    path: '/components/input-number'
  },
  {
    name: 'InputRadio',
    since: '0.6.0',
    status: 'REVIEWING',
    path: '/components/input-radio'
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
    name: 'JobTracker',
    since: '0.6.0',
    status: 'REVIEWING',
    path: '/components/job-tracker'
  },
  {
    name: 'Layout',
    since: '1.9.0',
    status: 'REVIEWING',
    path: '/components/layout'
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
    status: 'REVIEWING',
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
    status: 'REVIEWING',
    path: '/components/modal'
  },
  {
    name: 'NavBar',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/nav-bar'
  },
  {
    name: 'Notification',
    since: '1.13.4',
    status: 'REVIEWING',
    path: '/components/notification'
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
    name: 'SchemaForm',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/schema-form'
  },
  {
    name: 'Section',
    since: '0.7.0',
    status: 'REVIEWING',
    path: '/components/section'
  },
  {
    name: 'Stepper',
    since: '1.13.42',
    status: 'REVIEWING',
    path: '/components/stepper'
  },
  {
    name: 'Table',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/table'
  },
  {
    name: 'Tabs',
    since: '0.3.0',
    status: 'REVIEWING',
    path: '/components/tabs'
  },
  {
    name: 'Text',
    since: '1.0.0',
    status: 'EXPERIMENTAL',
    path: '/components/text'
  },
  {
    name: 'Tooltip',
    since: '0.6.0',
    status: 'REVIEWING',
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
