import React from 'react'
import PropTypes from 'prop-types'
import DefaultLayout from './default'
import { Alert } from '@myntra/uikit'

import './docs.css'

export default function DocsPageLayout({ children }) {
  return (
    <DefaultLayout>
      <div className="docs-page-layout">
        <Alert type="warning">
          This is documentation corresponds to UIKit v1.0. Go to{' '}
          <a href="//v0-uikit.myntra.com" target="_blank" rel="noopener noreferrer">
            v0-uikit.myntra.com
          </a>{' '}
          for previous versions.
        </Alert>
        {children}
      </div>
    </DefaultLayout>
  )
}

DocsPageLayout.propTypes = {
  children: PropTypes.any
}
