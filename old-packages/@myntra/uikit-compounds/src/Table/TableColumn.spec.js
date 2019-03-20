import React from 'react'
import { mount } from 'enzyme'
import TableColumn from './TableColumn'

function prepareForTest(props) {
  return mount(<TableColumn {...props} />)
}

it('should render correctly', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  prepareForTest({
    children: [<div key={0} />]
  })
  expect(spy).toHaveBeenCalledWith(expect.stringContaining('Only <Table.Column> component can be used'))
})
