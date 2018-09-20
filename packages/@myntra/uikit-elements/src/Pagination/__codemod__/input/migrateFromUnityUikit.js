import React from 'react'
import Pagination from 'unity-uikit/Pagination'

export default props => (
  <div>
    My Pagination
    <Pagination onChange={() => {}} sizes={[10, 20]} currentPage={1} totalSize={1} sizePerPage={1} />
  </div>
)
