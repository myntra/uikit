import React from 'react'
import * as compounds from '@myntra/uikit-compounds'
import RenderComponents from './_app/RenderComponents'

export default function ComponentElements() {
  return (
    <RenderComponents
      meta={name => () => import(`../packages/uikit-internals/dist/${name}.json`)}
      components={compounds}
    />
  )
}
