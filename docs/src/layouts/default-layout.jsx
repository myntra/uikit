import React from 'react'
import PropTypes from 'prop-types'

import './default-layout.css'

export default function DefaultLayout({ children }) {
  return (
    <section>
      <header>
        <h1>UIKit</h1>
      </header>

      <main>{children}</main>
    </section>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.any
}
