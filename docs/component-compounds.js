/* eslint-disable node/no-extraneous-import  */
import React from 'react'
import * as compounds from '@myntra/uikit-compounds'
import RenderComponents from './_app/RenderComponents'

export default function ComponentCompounds(props) {
  return (
    <RenderComponents
      {...props}
      meta={name => import(`@myntra/uikit-compounds/dist/${name}.json`)}
      packageName="@myntra/uikit-compounds"
      examples={name => import(`@myntra/uikit-compounds/src/${name}/${name}.md`)}
      components={compounds}
    />
  )
}
