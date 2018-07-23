import React from 'react'
import Input from 'unity-uikit/Input'
import { InputCheckBox } from '@myntra/uikit'

export default function MyComponent(props) {
  return <div>
    <Input type="text" readOnly {...props} />
    <Input type="number" required {...props} />
    <Input type="checkbox" disabled />
    <InputCheckBox required {...props} />
  </div>
}
