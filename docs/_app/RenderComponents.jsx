/* globals CURRENT_BRANCH */
/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import PropTypes from 'prop-types'
import { Promised } from '@myntra/uikit-elements'
import { ComponentDocumenter, Playground, Markdown } from '@myntra/uikit-internals'
import { PlaygroundProvider } from '@myntra/uikit-internals/src/Playground'
import { MarkdownProvider } from '@myntra/uikit-internals/src/Markdown'
import * as context from '@myntra/uikit'
const branch = (CURRENT_BRANCH || 'develop').replace(/^\/|\/$/, '')

const MarkdownCache = {}
function fetchMarkdown(path) {
  if (path in MarkdownCache) {
    return MarkdownCache[path]
  }

  MarkdownCache[path] = fetch(path).then(response => response.text())

  return MarkdownCache[path]
}

function renderDocument(name, component, examples) {
  const jsdoc = component.__docs
  const file = jsdoc.file
  const slug = file.replace(/\.jsx$/, '').split('src/')[1]

  return (
    <ComponentDocumenter
      {...jsdoc}
      key={name}
      source={`https://bitbucket.com/myntra/uikit/src/${branch}/${file}`}
      render={() => (
        <Promised
          fn={() => examples(slug).then(result => fetchMarkdown(result.default))}
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
  )
}

export default function RenderComponents({ components, examples, packageName, only }) {
  if (only.length === 0) {
    only.push(Object.keys(components).shift())
  }

  return (
    <MarkdownProvider value={context}>
      <PlaygroundProvider value={context}>
        {Object.entries(components)
          .filter(([name]) => only.some(p => name === p))
          .map(([name, component]) => {
            const subComponents = Object.keys(component)
              .filter(key => /^[A-Z]/.test(key) && !!component[key].__docs)
              .map(key => [key, component[key]])

            return (
              <div key={name}>
                {renderDocument(name, component, examples)}
                {subComponents.length ? <h2>Internal Sub-Components of {name}</h2> : null}
                {subComponents.map(([key, component]) => renderDocument(`${name}.${key}`, component, examples))}
              </div>
            )
          })}
      </PlaygroundProvider>
    </MarkdownProvider>
  )
}

RenderComponents.propTypes = {
  components: PropTypes.object.isRequired,
  examples: PropTypes.func.isRequired,
  packageName: PropTypes.string,
  only: PropTypes.arrayOf(PropTypes.string)
}

RenderComponents.defaultProps = {
  only: ['*']
}
