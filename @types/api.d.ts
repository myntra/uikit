import { ReactNode } from 'react'

export interface BaseProps {
  className?: string

  children?: ReactNode

  [key: string]: any
}
