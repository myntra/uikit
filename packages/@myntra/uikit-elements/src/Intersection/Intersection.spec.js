import React from 'react'
import { shallow, mount } from 'enzyme'

jest.mock('intersection-observer-polyfill')
import Intersection from './Intersection' // eslint-disable-line import/first
import Mock from 'intersection-observer-polyfill' // eslint-disable-line import/first

describe('Intersection', () => {
  const onIntersection = jest.fn()
  const onEnter = jest.fn()
  const onLeave = jest.fn()

  afterEach(() => {
    onIntersection.mockClear()
    onEnter.mockClear()
    onLeave.mockClear()
    Mock.clear()
  })

  it('should render first child', () => {
    const wrapper = shallow(
      <Intersection>
        <div id="child">foo</div>
      </Intersection>
    )

    expect(wrapper.find('#child')).toBeTruthy()
    expect(wrapper.text()).toBe('foo')
  })

  it('should create IntersectionObserver instance', () => {
    shallow(
      <Intersection rootMargin="0px" threshold={[0]}>
        <div id="child">foo</div>
      </Intersection>
    )

    const observer = Mock.instances[0]

    expect(observer.options.root).toBe(null)
    expect(observer.options.rootMargin).toBe('0px')
    expect(observer.options.threshold).toEqual([0])
  })

  it('should create IntersectionObserver instance with custom root', () => {
    const ref = React.createRef()

    const wrapper = shallow(
      <Intersection root={ref} rootMargin="0px" threshold={[0]}>
        <div id="child">foo</div>
      </Intersection>
    )

    const observer = Mock.instances[0]

    expect(observer.options.root).toBe(ref.current)
    expect(observer.options.rootMargin).toBe('0px')
    expect(observer.options.threshold).toEqual([0])

    wrapper.update()

    expect(Mock.instances).toHaveLength(1)
  })

  it('should create new IntersectionObserver instance if root changes', () => {
    const ref = React.createRef()

    const wrapper = mount(
      <Intersection root={ref}>
        <div id="child">foo</div>
      </Intersection>
    )

    const observer = Mock.instances[0]

    expect(observer.options.root).toBe(ref.current)

    const root = React.createRef()
    root.current = wrapper.find('#child').getDOMNode()
    wrapper.setProps({ root })

    expect(Mock.instances).toHaveLength(2)
    expect(observer.options.root).toBe(ref.current)
  })

  it('should destroy when unmounted', () => {
    const wrapper = shallow(
      <Intersection>
        <div id="child">foo</div>
      </Intersection>
    )

    const observer = Mock.instances[0]
    observer.disconnect = jest.fn()

    wrapper.unmount()

    expect(observer.disconnect).toBeCalled()
  })

  it('should change options when props change', () => {
    const wrapper = shallow(
      <Intersection>
        <div id="child">foo</div>
      </Intersection>
    )

    wrapper.setProps({ threshold: 0 })

    expect(Mock.instances).toHaveLength(2)
  })

  it('should observe new children', () => {
    const wrapper = shallow(
      <Intersection>
        <div key="foo">foo</div>
      </Intersection>
    )

    expect(wrapper.text()).toBe('foo')

    const observer = Mock.instances[0]
    observer.observe = jest.fn()
    observer.unobserve = jest.fn()

    wrapper.setProps({ children: <div key="bar">bar</div> })

    expect(wrapper.text()).toBe('bar')
    expect(observer.observe).toBeCalled()

    wrapper.setProps({})

    expect(Mock.instances).toHaveLength(1)
  })

  it('should fire onIntersection event', () => {
    shallow(
      <Intersection onIntersection={onIntersection}>
        <div id="child">foo</div>
      </Intersection>
    )

    const observer = Mock.instances[0]
    const value = { isIntersecting: false }
    observer.handler([value])

    expect(onIntersection).toBeCalledWith(value)
  })

  it('should fire onEnter & onLeave events', () => {
    shallow(
      <Intersection onEnter={onEnter} onLeave={onLeave}>
        <div id="child">foo</div>
      </Intersection>
    )

    const observer = Mock.instances[0]
    const value = { isIntersecting: true }

    observer.handler([value])
    expect(onEnter).toBeCalledWith(value)
    expect(onLeave).not.toBeCalled()

    onEnter.mockClear()
    onLeave.mockClear()

    value.isIntersecting = false

    observer.handler([value])
    expect(onEnter).not.toBeCalled()
    expect(onLeave).toBeCalledWith(value)
  })

  it('should fire onEnter & onLeave events once', () => {
    shallow(
      <Intersection onEnter={onEnter} onLeave={onLeave} once>
        <div id="child">foo</div>
      </Intersection>
    )

    const observer = Mock.instances[0]
    let value = { isIntersecting: true }

    // -- intersecting
    observer.handler([value])
    expect(onEnter).toBeCalledWith(value)
    expect(onLeave).not.toBeCalled()

    onEnter.mockClear()
    onLeave.mockClear()
    // -- non-intersecting
    value = { isIntersecting: false }
    observer.handler([value])
    expect(onEnter).not.toBeCalled()
    expect(onLeave).toBeCalledWith(value)

    onEnter.mockClear()
    onLeave.mockClear()
    // -- non-intersecting
    // -- should not trigger if same event is trigger again.
    value = { isIntersecting: false }

    observer.handler([value])
    expect(onEnter).not.toBeCalled()
    expect(onLeave).not.toBeCalled()

    onEnter.mockClear()
    onLeave.mockClear()
    // -- intersecting
    value = { isIntersecting: true }

    observer.handler([value])
    expect(onEnter).toBeCalledWith(value)
    expect(onLeave).not.toBeCalled()

    onEnter.mockClear()
    onLeave.mockClear()
    // -- intersecting
    // -- should not trigger if same event is trigger again.
    value = { isIntersecting: true }

    observer.handler([value])
    expect(onEnter).not.toBeCalled()
    expect(onLeave).not.toBeCalled()
  })
})
