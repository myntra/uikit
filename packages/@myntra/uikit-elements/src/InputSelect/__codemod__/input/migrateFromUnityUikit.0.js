import React from 'react'
import InputSelect from 'unity-uikit/SelectBox'

export default props => (
  <div>
    My Select Box
    <InputSelect value={props.value} noResultsText="Not Found" multi />
  </div>
)
