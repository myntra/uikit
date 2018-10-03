import React from 'react'
import { mount } from 'enzyme'
import TableSimple from './TableSimple'

function prepareForTest(props) {
  return mount(
    <TableSimple
      head={{
        colgroup: [{ colSpan: 2, key: 'name', column: {} }],
        rows: [
          {
            id: 0,
            columns: [{ key: 'firstName', children: 'First Name' }, { key: 'lastName', children: 'Last Name' }]
          }
        ]
      }}
      body={{
        rows: [
          {
            id: 1,
            columns: [{ key: 'firstName', children: 'John', head: true }, { key: 'lastName', children: 'Doe' }]
          }
        ]
      }}
      renderRow={({ children }) => children}
      {...props}
    />
  )
}

it('should render correctly', () => {
  const wrapper = prepareForTest()

  expect(wrapper).toMatchSnapshot()
})
