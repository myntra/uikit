/* globals CURRENT_BRANCH */

import React from 'react'
import PropTypes from 'prop-types'
import { Promised } from '@myntra/uikit-elements'
import { ComponentDocumenter, Playground, Markdown } from '@myntra/uikit-internals'
import { PlaygroundProvider } from '@myntra/uikit-internals/src/Playground'
import { MarkdownProvider } from '@myntra/uikit-internals/src/Markdown'

const branch = CURRENT_BRANCH || 'develop'

export default function RenderComponents({ components, meta, examples, packageName }) {
  return (
    <MarkdownProvider value={components}>
      <PlaygroundProvider value={components}>
        {Object.entries(components).map(([name, component]) => (
          <Promised
            key={name}
            fn={() => meta(name)}
            render={jsdoc => (
              <ComponentDocumenter
                {...jsdoc}
                source={`https://bitbucket.com/myntra/uikit/src/${branch}/packages/${packageName}/src/${name}`}
                render={() => (
                  <Promised
                    fn={() =>
                      examples(name)
                        .then(result => fetch(result.default))
                        .then(response => response.text())
                    }
                    renderLoading={() => null}
                    renderError={() => null}
                    render={content => <Markdown>{content}</Markdown>}
                  />
                )}
              >
                <Playground>{jsdoc.example.find(_ => true)}</Playground>
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
  examples: PropTypes.func.isRequired,
  meta: PropTypes.func.isRequired,
  packageName: PropTypes.string
}
