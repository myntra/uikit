import React from 'react'
import classnames from './page.module.scss'

export interface PageProps extends BaseProps {
  /**
   * Renders a nav using [NavBar](../components/nav-bar).
   */
  renderNavBar(): JSX.Element
  /**
   * Renders a header using [TopBar](../components/top-bar).
   */
  renderTopBar(): JSX.Element
  /**
   * Contents of the page.
   */
  children: JSX.Element
}

/**
 * A basic layout component with side nav and header.
 *
 * @since 0.11.0
 * @status READY
 * @category layout
 * @see http://uikit.myntra.com/components/page
 */
export default function Page({
  renderNavBar,
  renderTopBar,
  children,
  className,
  ...props
}: PageProps) {
  return (
    <div className={classnames('page', className)}>
      <div className={classnames('nav')} key="nav">
        {renderNavBar()}
      </div>
      <div className={classnames('container')}>
        <div className={classnames('header')} key="header">
          {renderTopBar()}
        </div>
        <div {...props} className={classnames('main')} key="main">
          {children}
        </div>
      </div>
    </div>
  )
}
