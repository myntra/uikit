import React from 'react'
import { mount } from 'enzyme'

import Dropdown from './Dropdown'
import Button from '../Button/Button'

it('should render dropdown correctly', () => {
  const wrapper = mount(
    <Dropdown trigger="Open" isOpen={false}>
      <p>Some Content</p>
    </Dropdown>
  )

  expect(wrapper.text()).toBe('Open')

  wrapper.setProps({ isOpen: true })
  expect(wrapper.text()).toEqual(expect.stringContaining('Some Content'))
})

it('should render custom trigger', () => {
  const fn = jest.fn()
  const wrapper = mount(
    <Dropdown trigger={<button id="foo">Open</button>} isOpen={false} onOpen={fn}>
      <p>Some Content</p>
    </Dropdown>
  )

  wrapper.find('button').simulate('click')

  expect(fn).toHaveBeenCalled()

  expect(wrapper.find('#foo')).toBeTruthy()
})

it('should fire events and update state', () => {
  const handleOpen = jest.fn()
  const handleClose = jest.fn()
  const wrapper = mount(
    <Dropdown trigger="Open" isOpen={false} onOpen={handleOpen} onClose={handleClose}>
      <p>Some Content</p>
    </Dropdown>
  )

  expect(wrapper.props().isOpen).toBe(false)

  wrapper.find(Button).simulate('click')
  expect(handleOpen).toBeCalledWith()

  wrapper.setProps({ isOpen: true })
  wrapper.find(Button).simulate('click')
})

it('should open up and align left', () => {
  const wrapper = mount(
    <Dropdown trigger="Open" isOpen={false} up left>
      <p>Some Content</p>
    </Dropdown>
  )

  wrapper.find(Button).simulate('click')
  wrapper.setProps({ isOpen: true })
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
})

describe('toggle', () => {
  it('should ignore consecutive toggle events', () => {
    let isOpen = false
    const handleOpen = jest.fn().mockImplementation(() => (isOpen = true))
    const handleClose = jest.fn().mockImplementation(() => (isOpen = false))
    const dropdown = mount(
      <Dropdown trigger="Trigger" isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
        <div>content</div>
      </Dropdown>
    )

    expect(isOpen).toBe(false)

    dropdown.instance().toggle()

    expect(handleOpen).toHaveBeenCalled()
    expect(handleClose).not.toHaveBeenCalled()
    expect(isOpen).toBe(true)

    handleOpen.mockClear()

    expect(dropdown.instance().coolDownTimer > 0).toBe(true)
    dropdown.instance().toggle()
    expect(handleOpen).not.toHaveBeenCalled()
    expect(handleClose).not.toHaveBeenCalled()

    expect(isOpen).toBe(true)
  })
})

describe('auto align', () => {
  it('should call calculateAutoPosition on toggle', done => {
    const ref = new Dropdown({ auto: true, isOpen: false })
    const spy = jest.spyOn(ref, 'calculateAutoPosition').mockImplementation(() => ({}))
    jest.spyOn(ref, 'setState').mockImplementation(() => ({}))
    ref.toggle()

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 20)
  })

  it('should call calculateAutoPosition on measure', done => {
    const ref = new Dropdown({ auto: true, isOpen: false, approxContentWidth: 100, approxContentHeight: 100 })
    const spy = jest.spyOn(ref, 'calculateAutoPosition').mockImplementation(() => ({}))
    jest.spyOn(ref, 'setState').mockImplementation(() => ({}))
    ref.handleMeasure({
      bounds: { width: 100, height: 100 }
    })

    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled()
      ref.handleMeasure({
        bounds: { width: 200, height: 200 }
      })

      setTimeout(() => {
        expect(spy).toHaveBeenCalled()
        done()
      }, 20)
    }, 20)
  })

  it('should not call calculateAutoPosition on toggle if auto is false', done => {
    const ref = new Dropdown({ auto: false })
    const spy = jest.spyOn(ref, 'calculateAutoPosition').mockImplementation(() => ({}))
    jest.spyOn(ref, 'setState').mockImplementation(() => ({}))
    ref.toggle()

    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled()
      done()
    }, 20)
  })
})

describe('auto align calculate', () => {
  const instance = new Dropdown({ auto: true, approxContentWidth: 100, approxContentHeight: 100 })
  const node = (top, left, width, height) => ({
    getBoundingClientRect() {
      return { top, left, right: left + width, bottom: top + height, width, height }
    }
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

  const fn = jest.fn()

  const wrapper = mount(
    <Dropdown trigger="Open" onOpen={fn} isOpen={false}>
      <p>Some Content</p>
    </Dropdown>
  )

  expect(wrapper.text()).toBe('Open')

  wrapper.find(Button).simulate('click')

  expect(fn).toHaveBeenCalled()

  React.createRef = original
})
