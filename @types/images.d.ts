declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module 'uikit-icons/svgs/*' {
  import React from 'react'
  const Component: React.FC<React.SVGProps<SVGSVGElement>>
  export default Component
}
