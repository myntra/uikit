import React from 'react'
import { mount } from 'enzyme'
import TableRow from './TableRow'

function prepareForTest(props) {
  return mount(
    <table>
      <tbody>
        <TableRow {...props} />
      </tbody>
    </table>
  )
}

it('should render correctly', () => {
  const wrapper = prepareForTest()

  expect(wrapper.find('tr')).toBeTruthy()
})
