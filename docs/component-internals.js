import React from 'react'
import * as internals from '@myntra/uikit-internals'
import RenderComponents from './_app/RenderComponents'

export default function ComponentElements() {
  return (
    <RenderComponents meta={name => () => import(`@myntra/uikit-internals/dist/${name}.json`)} components={internals} />
  )
}
