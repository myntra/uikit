import React from 'react'
import { mount } from 'enzyme'
import TableSimple from './TableSimple'
import TableCell from './TableCell'
import TableRow from './TableRow'

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
      Cell={TableCell}
      Row={TableRow}
      {...props}
    />
  )
}

it('should render correctly', () => {
  const wrapper = prepareForTest()

  expect(wrapper).toMatchSnapshot()
})
