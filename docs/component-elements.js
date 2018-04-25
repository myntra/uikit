import React from 'react'
import * as elements from '@myntra/uikit-elements'
import RenderComponents from './_app/RenderComponents'

export default function ComponentElements() {
  return (
    <RenderComponents
      meta={name => () => import(`../packages/uikit-elements/dist/${name}.json`)}
      components={elements}
    />
  )
}
