import React from 'react'
import Input from 'unity-uikit/Input'

import { InputText } from '@myntra/uikit'

export default function MyComponent(props) {
  return (
    <div>
      <InputText readOnly {...props} />
      <Input type="number" required {...props} />
    </div>
  )
}
