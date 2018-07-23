import React from 'react'
import Input from 'unity-uikit/Input'

export default function MyComponent(props) {
  return <div>
    <Input type="text" readOnly {...props} />
    <Input type="number" required {...props} />
    <Input type="checkbox" required />
  </div>
}
