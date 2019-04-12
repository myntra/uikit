import React from 'react'
import PropTypes from 'prop-types'
import DefaultLayout from './default-layout'

import './docs-page.css'

export default function DocsPageLayout({ children }) {
  return (
    <DefaultLayout>
      <div className="docs-page-layout">{children}</div>
    </DefaultLayout>
  )
}

DocsPageLayout.propTypes = {
  children: PropTypes.any
}
