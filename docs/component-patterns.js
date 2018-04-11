import React from 'react'
import * as patterns from '@myntra/uikit-patterns'
import RenderComponents from './_app/RenderComponents'

export default function ComponentElements() {
  return (
    <RenderComponents
      meta={name => () => import(`../packages/uikit-internals/dist/${name}.json`)}
      components={patterns}
    />
  )
}
