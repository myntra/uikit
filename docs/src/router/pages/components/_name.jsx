import React, { useEffect, useMemo, useState, useContext, createContext, useCallback, useRef, Children } from 'react'
import Documenter from '@components/documenter'
import Editor, { EditorContext } from '@components/editor'
import Button from '@uikit/button'
import Measure from '@uikit/measure'
import { withRootState } from '@spectrum'
import CodePreview from '@components/code-preview'
import Layout from '@layouts/default-layout'

import './_name.css'

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
  const ref = useRef(null)
  const hide = useCallback(() => setActive(false), [setActive])
  const content = useMemo(
    () =>
      Component ? (
        <Component components={{ wrapper: ({ children }) => <div className="content">{children}</div> }} />
      ) : null,
    [Component]
  )

  useEffect(() => {
    findDocumentation(name, setComponent)
  })

  return (
    <Layout>
      <div className={`component ${isActive ? 'active' : ''}`}>
        <EditorContext.Provider
          value={{
            source,
            setSource: source => {
              setSource(source)
              setActive(true)
            }
          }}
        >
          {content}
        </EditorContext.Provider>
        {
          <div className={`editor`} ref={ref}>
            <Button className="close" icon="times" onClick={hide} />
            <CodePreview className="preview" source={source} />
            <Measure bounds>
              {({
                content: {
                  bounds: { width = 200, height = 100 }
                },
                ref
              }) => (
                <div className="monaco" ref={ref}>
                  <Editor value={source} width={width} height={height} onChange={setSource} />
                </div>
              )}
            </Measure>
          </div>
        }
      </div>
    </Layout>
  )
}
