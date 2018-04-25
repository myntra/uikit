import React from 'react'
import PropTypes from 'prop-types'
import { Promised } from '@myntra/uikit-elements'
import { ComponentDocumenter, Playground, Markdown } from '@myntra/uikit-internals'
import { PlaygroundProvider } from '@myntra/uikit-internals/src/Playground'
import { MarkdownProvider } from '@myntra/uikit-internals/src/Markdown'

export default function RenderComponents({ components, meta }) {
  return (
    <MarkdownProvider value={components}>
      <PlaygroundProvider value={components}>
        {Object.entries(components)
          .map(([name, component]) => ({ name, component, meta: meta(name) }))
          .map(ref => (
            <Promised
              key={ref.name}
              fn={ref.meta}
              render={meta => (
                <ComponentDocumenter
                  {...meta}
                  render={() => (
                    <Promised
                      fn={() =>
                        import(`../components/${ref.name}.md`)
                          .then(result => fetch(result.default))
                          .then(response => response.text())
                      }
                      render={content => <Markdown>{content}</Markdown>}
                    />
                  )}
                >
                  <Playground>{meta.example.find(_ => true)}</Playground>
                </ComponentDocumenter>
              )}
            />
          ))}
      </PlaygroundProvider>
    </MarkdownProvider>
  )
}

RenderComponents.propTypes = {
  components: PropTypes.object.isRequired,
  meta: PropTypes.func.isRequired
}
