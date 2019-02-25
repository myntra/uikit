import React from 'react'
import { Button, interopPropTransformer } from '@myntra/uikit'

const interopPropTransformerButton$0 = interopPropTransformer(
  {
    modifier: 'type'
  },
  {}
)

export default function MyComponent(props) {
  return <Button {...interopPropTransformerButton$0(props)}>{'Some Text'}</Button>
}
