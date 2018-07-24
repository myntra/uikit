import React from 'react'
import InputSelect from 'unity-uikit/SelectBox'

export default props => (
  <div>
    My Select Box
    <InputSelect {...props} onFocus={() => {}} maxOptions={10} />
  </div>
)
