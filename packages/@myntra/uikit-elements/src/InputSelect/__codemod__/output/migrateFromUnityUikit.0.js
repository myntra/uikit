import React from 'react'
import { InputSelect } from '@myntra/uikit'

export default props => (
  <div>
    My Select Box
    <InputSelect value={props.value} noResultsPlaceholder="Not Found" multiple />
  </div>
)
