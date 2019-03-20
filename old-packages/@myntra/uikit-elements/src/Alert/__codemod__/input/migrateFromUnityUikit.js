import React from 'react'
import Toast from 'unity-uikit/Toast'

export default props => (
  <div>
    Toast here
    <Toast type={'error'} message="Not Found"/>
    <Toast type={'error'} message={"Not Found" + "Again"}/>
  </div>
)
