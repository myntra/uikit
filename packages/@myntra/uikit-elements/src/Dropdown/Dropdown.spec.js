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

it('should open up and align left', () => {
  const wrapper = mount(
    <Dropdown trigger="Open" up left>
      <p>Some Content</p>
    </Dropdown>
  )

  wrapper.find('.trigger').simulate('click')
  const el = wrapper.find('.content')

  expect(el.hasClass('up')).toBe(true)
  expect(el.hasClass('left')).toBe(true)
  expect(el.hasClass('right')).toBe(false)
})

describe('prop co-existence', () => {
  let spy
  beforeEach(() => {
    spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    spy.mockClear()
    spy.mockReset()
  })

  it('should warn if auto is used with left', () => {
    mount(
      <Dropdown trigger="Open" auto left>
        <p>Some Content</p>
      </Dropdown>
    )

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('cannot be used with left'))
  })

  it('should warn if auto is used with right', () => {
    mount(
      <Dropdown trigger="Open" auto right>
        <p>Some Content</p>
      </Dropdown>
    )

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('cannot be used with right'))
  })

  it('should warn if auto is used with up', () => {
    mount(
      <Dropdown trigger="Open" auto up>
        <p>Some Content</p>
      </Dropdown>
    )

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('cannot be used with up'))
  })

  it('should warn if left and right co-exist', () => {
    mount(
      <Dropdown trigger="Open" left right>
        <p>Some Content</p>
      </Dropdown>
    )

    expect(spy).toHaveBeenCalledWith(expect.stringContaining(`Use one of 'left' or 'right'`))
  })
})

describe('auto align', () => {
  const instance = new Dropdown({ auto: true, approxContentWidth: 100, approxContentHeight: 100 })
  const node = (top, left, width, height) => ({
    getBoundingClientRect() {
      return { top, left, right: left + width, bottom: top + height, width, height }
    }
  })

  it('should call calculateAutoPosition on toggle', () => {
    const ref = new Dropdown({ auto: true })
    const spy = jest.spyOn(ref, 'calculateAutoPosition').mockImplementation(() => ({}))
    jest.spyOn(ref, 'setState').mockImplementation(() => ({}))
    ref.toggle()

    expect(spy).toHaveBeenCalled()
  })

  it('should not call calculateAutoPosition on toggle if auto is false', () => {
    const ref = new Dropdown({ auto: false })
    const spy = jest.spyOn(ref, 'calculateAutoPosition').mockImplementation(() => ({}))
    jest.spyOn(ref, 'setState').mockImplementation(() => ({}))
    ref.toggle()

    expect(spy).not.toHaveBeenCalled()
  })

  it('auto: default (no element)', () => {
    expect(instance.calculateAutoPosition(null, node(0, 0, 400, 400))).toEqual({
      left: false,
      up: false,
      right: false
    })
  })

  it('auto: default (no parent)', () => {
    expect(instance.calculateAutoPosition(node(0, 0, 400, 400), null)).toEqual({
      left: false,
      up: false,
      right: false
    })
  })

  it('auto: bottom left', () => {
    expect(instance.calculateAutoPosition(node(100, 100, 100, 100), node(0, 0, 400, 400))).toEqual({
      left: true,
      up: false,
      right: false
    })
  })

  it('auto: bottom right', () => {
    expect(instance.calculateAutoPosition(node(100, 300, 100, 100), node(0, 0, 400, 400))).toEqual({
      left: false,
      up: false,
      right: true
    })
  })

  it('auto: top left', () => {
    expect(instance.calculateAutoPosition(node(300, 100, 100, 100), node(0, 0, 400, 400))).toEqual({
      left: true,
      up: true,
      right: false
    })
  })

  it('auto: top right', () => {
    expect(instance.calculateAutoPosition(node(300, 300, 100, 100), node(0, 0, 400, 400))).toEqual({
      left: false,
      up: true,
      right: true
    })
  })
})

it('should fall-back to custom createRef implementation', () => {
  const original = React.createRef

  React.createRef = undefined

  const wrapper = mount(
    <Dropdown trigger="Open">
      <p>Some Content</p>
    </Dropdown>
  )

  expect(wrapper.text()).toBe('Open')

  wrapper.find('.trigger').simulate('click')

  expect(wrapper.state().isOpen).toBe(true)
  expect(wrapper.text()).toEqual(expect.stringContaining('Some Content'))

  React.createRef = original
})
