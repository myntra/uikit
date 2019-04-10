import React from 'react'
import { META } from '@/uikit'
import { AppLink } from '@spectrum'
import Table from '@myntra/uikit-component-table'

const states = {
  DEPRECATED: '💔',
  EXPERIMENTAL: '️❤️',
  REVIEWING: '💛',
  READY: '💚'
}

export default function Components() {
  return (
    <Table data={META} style={{ width: '600px' }}>
      <Table.Column label="Name" key="name">
        {({ data: component }) => <AppLink to={component.path}>{component.name}</AppLink>}
      </Table.Column>
      <Table.Column label="Available" key="since">
        {({ data: component }) => `v${component.since}+`}
      </Table.Column>
      <Table.Column label="Status" key="status">
        {({ data: component }) => `${states[component.status]} ${component.status}`}
      </Table.Column>
    </Table>
  )
}
