import React from 'react'
import PropTypes from 'prop-types'
import DefaultLayout from './default'

export default function DocsPageLayout({ children }) {
  return (
    <DefaultLayout>
      <div style={{ margin: 'auto', maxWidth: '800px' }}>{children}</div>
    </DefaultLayout>
  )
}

DocsPageLayout.propTypes = {
  children: PropTypes.any
}
