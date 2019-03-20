import React from 'react'
import { mount } from 'enzyme'
import TableCell from './TableCell'

function prepareForTest(props) {
  return mount(
    <table>
      <tbody>
        <tr>
          <TableCell {...props} />
        </tr>
      </tbody>
    </table>
  )
}

it('should render cell', () => {
  const wrapper = prepareForTest({ children: 'foo' })

  expect(wrapper.find('td')).toBeTruthy()
  expect(wrapper.find('td').text()).toBe('foo')
})

it('should render header cell', () => {
  const wrapper = prepareForTest({ head: true })

  expect(wrapper.find('th')).toBeTruthy()
})
