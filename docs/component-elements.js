import React from 'react'
import * as elements from '@myntra/uikit-internals'
import RenderComponents from './_app/RenderComponents'

export default function ComponentElements() {
  return (
    <RenderComponents
      meta={name => () => import(`../packages/uikit-internals/dist/${name}.json`)}
      components={elements}
    />
  )
}
