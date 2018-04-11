import React from 'react'
import PropTypes from 'prop-types'
import { Promised } from '@myntra/uikit-elements'
import { ComponentDocumenter, Playground } from '@myntra/uikit-internals'

export default function RenderComponents({ components, meta }) {
  return (
    <div>
      {Object.entries(components)
        .map(([name, component]) => ({ name, component, meta: meta(name) }))
        .map(ref => (
          <Promised
            key={ref.name}
            fn={ref.meta}
            render={meta => (
              <ComponentDocumenter {...meta}>
                <Playground context={components}>{meta.example.find(_ => true)}</Playground>
              </ComponentDocumenter>
            )}
          />
        ))}
    </div>
  )
}

RenderComponents.propTypes = {
  components: PropTypes.object.isRequired,
  meta: PropTypes.func.isRequired
}
