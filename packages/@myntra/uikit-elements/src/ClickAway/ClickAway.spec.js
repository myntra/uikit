import React from 'react'
import { mount } from 'enzyme'

import ClickAway from './ClickAway'

describe('click away event', () => {
  const handlers = {}

  document.addEventListener = jest.fn((event, cb) => {
    handlers[event] = cb
  })

  document.removeEventListener = jest.fn()

  const ref = React.createRef()
  const fn = jest.fn()
  const TestComponent = (
    { eventName, target } // eslint-disable-line react/prop-types
  ) => (
    <div id="outer">
      <div id="target" ref={target}>
        <span id="child" />
      </div>
      <ClickAway onClickAway={fn} target={target} domEventName={eventName} />
    </div>
  )
  let wrapper

  beforeEach(() => {
    wrapper = mount(<TestComponent target={ref} />)
  })

  afterEach(() => {
    document.addEventListener.mockClear()
    document.removeEventListener.mockClear()
    fn.mockClear()
  })

  it('has target ref', () => {
    expect(ref.current).toBeTruthy()
    expect(ref.current.id).toBe('target')
  })

  it('should not trigger when clicked inside target', () => {
    handlers.click({
      target: wrapper.find('#child').getDOMNode()
    })
    expect(fn).not.toBeCalled()
  })

  it('should not trigger when clicked on target', () => {
    handlers.click({
      target: wrapper.find('#target').getDOMNode()
    })
    expect(fn).not.toBeCalled()
  })

  it('should trigger when clicked outside target', () => {
    handlers.click({
      target: wrapper.find('#outer').getDOMNode()
    })
    expect(fn).toBeCalled()
  })

  it('uses path when available', () => {
    handlers.click({
      path: [wrapper.find('#outer').getDOMNode()]
    })
    expect(fn).toBeCalled()
  })

  it('uses composePath when available', () => {
    handlers.click({
      composedPath: () => [wrapper.find('#outer').getDOMNode()]
    })
    expect(fn).toBeCalled()
  })

  it('uses path over target and composePath', () => {
    handlers.click({
      path: [wrapper.find('#target').getDOMNode()],
      composedPath: () => [wrapper.find('#outer').getDOMNode()],
      target: wrapper.find('#outer').getDOMNode()
    })
    expect(fn).not.toBeCalled()
  })

  it('uses composePath over target.contains', () => {
    handlers.click({
      composedPath: () => [wrapper.find('#target').getDOMNode()],
      target: wrapper.find('#outer').getDOMNode()
    })
    expect(fn).not.toBeCalled()
  })

  it('should remove event handler when event name changes', done => {
    wrapper.setProps({ eventName: 'mousedown' }, () => {
      expect(document.removeEventListener).toBeCalledWith('click', handlers.click)

      handlers.mousedown({
        composedPath: () => [wrapper.find('#outer').getDOMNode()]
      })
      expect(fn).toBeCalled()
      done()
    })
  })

  it('should ignore event when target is not available', done => {
    wrapper.setProps({ target: undefined }, () => {
      handlers.click({
        composedPath: () => [wrapper.find('#outer').getDOMNode()]
      })
      expect(fn).not.toBeCalled()
      done()
    })
  })

  it('should remove event handlers before unmount', () => {
    wrapper.unmount()
    expect(document.removeEventListener).toBeCalledWith('click', handlers.click)
  })
})
