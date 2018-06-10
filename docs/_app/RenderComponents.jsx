/* globals CURRENT_BRANCH */

import React from 'react'
import PropTypes from 'prop-types'
import { Promised } from '@myntra/uikit-elements'
import { ComponentDocumenter, Playground, Markdown } from '@myntra/uikit-internals'
import { PlaygroundProvider } from '@myntra/uikit-internals/src/Playground'
import { MarkdownProvider } from '@myntra/uikit-internals/src/Markdown'

const branch = (CURRENT_BRANCH || 'develop').replace(/^\/|\/$/, '')

const MarkdownCache = {}
function fetchMarkdown(path) {
  if (path in MarkdownCache) {
    console.log('From cache: ' + path)

    return MarkdownCache[path]
  }

  MarkdownCache[path] = fetch(path).then(response => response.text())

  return MarkdownCache[path]
}

export default function RenderComponents({ components, meta, examples, packageName, only }) {
  if (only.length === 0) {
    only.push(Object.keys(components).shift())
  }

  return (
    <MarkdownProvider value={components}>
      <PlaygroundProvider value={components}>
        {Object.entries(components)
          .filter(([name]) => only.some(p => name.startsWith(p)))
          .map(([name, component]) => (
            <Promised
              key={name}
              fn={() => meta(name)}
              render={jsdoc => (
                <ComponentDocumenter
                  {...jsdoc}
                  source={`https://bitbucket.com/myntra/uikit/src/${branch}/packages/${packageName}/src/${name}`}
                  render={() => (
                    <Promised
                      fn={() => examples(name).then(result => fetchMarkdown(result.default))}
                      renderLoading={() => null}
                      renderError={() => null}
                      render={content => (
                        <div className="examples">
                          <Markdown>{content}</Markdown>
                        </div>
                      )}
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
  packageName: PropTypes.string,
  only: PropTypes.arrayOf(PropTypes.string)
}

RenderComponents.defaultProps = {
  only: ['*']
}
