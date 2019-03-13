import React, { useEffect, useState, useContext, createContext, useCallback } from 'react'
import Documenter from '@components/documenter'
import Editor, { EditorContext } from '@components/editor'
import Button from '@uikit/button'

import './_name.css'
import CodePreview from '@components/code-preview';

async function findFile(getModule, Component, setComponent) {
  try {
    const Module = await getModule()

    return Module.default
  } catch (e) {
    return null
  }
}

async function findDocumentation(name, setComponent) {
  const readme = await findFile(() => import(`@uikit/${name}/readme.mdx`))

  if (readme) {
    setComponent(() => readme)

    return
  }

  const component = await findFile(() => import(`@uikit/${name}/src/${name}.tsx`))

  if (component) {
    setComponent(() => () => <Documenter component={component} hideName={false} />)

    return
  }

  setComponent(() => () => <div>Cannot find component named: {name}</div>)
}

export default function ComponentDocumentationPage({ name }) {
  const [Component, setComponent] = useState(null)
  const [source, setSource] = useState(null)
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    findDocumentation(name, setComponent)
  })

  // TODO: Add ClickAway here!
  return (
    <div className="component">
      <EditorContext.Provider value={{
        source, setSource: source => {
          setSource(source)
          setActive(true)
        }
      }}>
        {Component ? <Component components={{ wrapper: 'div' }} /> : null}
      </EditorContext.Provider>
      {<div className={`editor ${isActive ? 'active' : ''}`}>
        <Button className="close" icon="times" onClick={() => setActive(false)} />
        <CodePreview className="preview" source={source} />
        <Editor value={source} onChange={setSource} />
      </div>}
    </div>
  )
}
