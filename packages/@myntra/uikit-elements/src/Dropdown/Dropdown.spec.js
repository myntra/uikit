import React from 'react'
import { shallow, mount } from 'enzyme'

import Dropdown from './Dropdown'

it('should render dropdown correctly', () => {
  const wrapper = mount(
    <Dropdown trigger="Open">
      <p>Some Content</p>
    </Dropdown>
  )

  expect(wrapper.text()).toBe('Open')

  wrapper.find('.trigger').simulate('click')

  expect(wrapper.state().isOpen).toBe(true)
  expect(wrapper.text()).toEqual(expect.stringContaining('Some Content'))
})

it('should render custom trigger', () => {
  const wrapper = mount(
    <Dropdown trigger={<button id="foo">Open</button>}>
      <p>Some Content</p>
    </Dropdown>
  )

  expect(wrapper.text()).toBe('Open')

  wrapper.find('.trigger').simulate('click')

  expect(wrapper.state().isOpen).toBe(true)
  expect(wrapper.text()).toEqual(expect.stringContaining('Some Content'))

  expect(wrapper.find('#foo')).toBeTruthy()
})

it('should fire events and update state', () => {
  const handleOpen = jest.fn()
  const handleClose = jest.fn()
  const wrapper = shallow(
    <Dropdown trigger="Open" onOpen={handleOpen} onClose={handleClose}>
      <p>Some Content</p>
    </Dropdown>
  )

  expect(wrapper.state().isOpen).toBe(false)

  wrapper.find('.trigger').simulate('click')
  expect(handleOpen).toBeCalledWith()
  expect(wrapper.state().isOpen).toBe(true)

  wrapper.find('.trigger').simulate('click')
  expect(handleClose).toBeCalledWith()
  expect(wrapper.state().isOpen).toBe(false)

  handleOpen.mockClear()

  wrapper.find('.trigger').simulate('click')
  expect(handleOpen).toBeCalledWith()
  expect(wrapper.state().isOpen).toBe(true)

  handleClose.mockClear()

  wrapper.instance().close()
  expect(handleClose).toBeCalledWith()
  expect(wrapper.state().isOpen).toBe(false)
})

it('should open up and align left & right', () => {
  const wrapper = mount(
    <Dropdown trigger="Open" up left right>
      <p>Some Content</p>
    </Dropdown>
  )

  wrapper.find('.trigger').simulate('click')
  const el = wrapper.find('.content')

  expect(el.hasClass('up')).toBe(true)
  expect(el.hasClass('left')).toBe(true)
  expect(el.hasClass('right')).toBe(true)
})
