import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Editor, { EditorContext } from '@components/editor'
import { Measure, Button } from '@myntra/uikit'
import CodePreview from '@components/code-preview'
import { withAppState } from '@spectrum'
import { setCurrentSource, getters } from '@state/editor'

import './_name.css'

export default withAppState(state => ({ source: getters.current(state.editor) }), { setSource: setCurrentSource })(
  ComponentDocumentationPage
)

function ComponentDocumentationPage({ name, source, setSource }) {
  const [Component, setComponent] = useState(null)
  const [isActive, setActive] = useState(false)
  const ref = useRef(null)
  const { handleContentMeasure, editorWidth, editorPosition, contentPosition } = useEditorAutoSize()
  const hide = useCallback(() => setActive(false), [])
  const content = useMemo(
    () =>
      Component ? (
        // eslint-disable-next-line react/display-name
        <Component components={{ wrapper: ({ children }) => <div className="content">{children}</div> }} />
      ) : null,
    [Component]
  )

  useEffect(() => {
    findDocumentation(name, setComponent)
  }, [name])

  useEffect(() => {
    window.openEditor = () => setActive(true)
  }, [setActive])

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.querySelector('.monaco > *').focus()
    }
  }, [isActive])

  return (
    <Measure onMeasure={handleContentMeasure}>
      <div
        className={`component ${isActive ? 'active' : ''}`}
        style={{
          '--editor-width': `${editorWidth}px`,
          '--editor-position': `${editorPosition}px`,
          '--content-position': `translateX(${contentPosition}px)`
        }}
      >
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
            <Measure>
              {({ content: { bounds: editorSize }, ref }) => (
                <div className="monaco" ref={ref}>
                  <Editor
                    value={source}
                    width={editorSize.width || 600}
                    height={editorSize.height || 300}
                    onChange={setSource}
                  />
                </div>
              )}
            </Measure>
          </div>
        }
      </div>
    </Measure>
  )
}

ComponentDocumentationPage.propTypes = {
  name: PropTypes.string,
  source: PropTypes.string,
  setSource: PropTypes.func,
  children: PropTypes.any
}

async function findFile(getModule, Component, setComponent) {
  try {
    const Module = await getModule()

    return Module.default
  } catch (e) {
    return null
  }
}

async function findDocumentation(name, setComponent) {
  const readme = await findFile(() => import(`@component-docs/${name}/readme.mdx`))

  if (readme) {
    setComponent(() => readme)

    return
  }

  // Not a real component. Displays error message for missing component.
  // eslint-disable-next-line react/display-name
  setComponent(() => () => <div>Cannot find component named: {name}</div>)
}

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    let frame
    window.addEventListener('resize', () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        setWindowWidth(window.innerWidth)
      })
    })
  })

  return windowWidth
}

function useEditorAutoSize() {
  const windowWidth = useWindowWidth()
  // const [contentWidth, setContentWidth] = useState(800)
  // const handleContentMeasure = useCallback(
  //   ({ bounds: { width } }) => setContentWidth(Math.min(windowWidth, Math.max(width, 800))),
  //   []
  // )
  // const editorWidth = Math.max(320, contentWidth, windowWidth - contentWidth - 32 - 54)
  // const editorPosition = windowWidth - editorWidth
  // const contentPosition = windowWidth < 1200 ? -contentWidth - 16 : (contentWidth - windowWidth) / 2 + 54

  return {
    handleContentMeasure() {},
    editorWidth: windowWidth - 880,
    editorPosition: 880,
    contentPosition: -400
  }
}
