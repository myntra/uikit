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
      {...props}
    />
  )
}

it('should render correctly', () => {
  const wrapper = prepareForTest()

  expect(wrapper).toMatchSnapshot()
})

it('should use div', () => {
  const wrapper = prepareForTest({ useDiv: true })

  expect(wrapper).toMatchSnapshot()
})

it('should use custom row renderer', () => {
  const spy = jest.fn().mockImplementation(({ children, WithSentinel }) => children)
  prepareForTest({ useDiv: true, renderRow: spy })

  expect(spy).toBeCalledTimes(2)
})
