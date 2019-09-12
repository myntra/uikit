import React from 'react'
import classnames from './title.module.scss'

export interface Props extends BaseProps {
  weight?: 'bolder' | 'lighter'
}

export default function Title({ className, weight, children }: Props) {
  return <h1 className={classnames('title', className, weight)}>{children}</h1>
}
