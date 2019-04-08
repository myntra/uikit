import React from 'react'
import { META } from '@/uikit'
import { AppLink } from '@spectrum'

export default function Components() {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Available</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {META.map(component => (
          <tr key={component.name}>
            <td>
              <AppLink to={component.path}>{component.name}</AppLink>
            </td>
            <td>v{component.since}+</td>
            <td>{component.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
