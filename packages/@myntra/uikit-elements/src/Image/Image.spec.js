import React from 'react'
import { shallow, mount } from 'enzyme'
import Image, { OBSERVER } from './Image'

describe('Image', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Image src="https://picsum.photos/300/200" alt={'example'} lazyLoad={false} width={'100px'} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('lazy loads image', () => {
    const url = 'https://picsum.photos/300/200'
    const wrapper = shallow(<Image src={url} />)

    expect(wrapper.find('img').html()).not.toEqual(expect.stringContaining(url))

    wrapper.setState({ status: 'loaded', isIntersecting: true })

    expect(wrapper.find('img').html()).toEqual(expect.stringContaining(url))
  })

  it('schedules image download using requestIdleCallback or setTimeout', () => {
    const spy = jest.spyOn(window, 'setTimeout')
    mount(<Image src="https://picsum.photos/300/200" />)

    expect(spy).toHaveBeenCalled()
    spy.mockClear()
  })

  it('reschedules image download on src change', done => {
    const spy = jest.spyOn(window, 'setTimeout')
    const wrapper = mount(<Image src="https://picsum.photos/300/200" />)
    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.setProps({ src: 'https://picsum.photos/300/300' }, () => {
      expect(spy).toHaveBeenCalledTimes(2)
      done()
    })
    spy.mockClear()
  })

  describe('IntersectionObserver', () => {
    it('attaches intersection observer on mount', () => {
      const wrapper = mount(<Image src="https://picsum.photos/300/200" />)
      const { observer, ref } = wrapper.instance()

      expect(observer).toBeTruthy()
      expect(observer.handlers.get(ref.current)).toBeTruthy()
    })

    it('releases intersection observer on unmount', () => {
      const wrapper = mount(<Image src="https://picsum.photos/300/200" />)
      const { observer, ref } = wrapper.instance()

      wrapper.unmount()

      expect(observer.handlers.get(ref.current)).toBeFalsy()
    })

    it('calls correct intersection handler', () => {
      const wrapper = mount(<Image src="https://picsum.photos/300/200" />)
      const instance = wrapper.instance()
      const { observer } = instance

      expect(wrapper.state('isIntersecting')).toBe(false)

      observer.raw.handler([{ target: null, isIntersecting: true }])
      expect(wrapper.state('isIntersecting')).toBe(false)

      observer.raw.handler([{ target: instance.ref.current, isIntersecting: false }])
      expect(wrapper.state('isIntersecting')).toBe(false)

      observer.raw.handler([{ target: instance.ref.current, isIntersecting: true }])
      expect(wrapper.state('isIntersecting')).toBe(true)
    })

    it('unobserves on intersection', () => {
      const wrapper = mount(<Image src="https://picsum.photos/300/200" />)
      const { observer } = wrapper.instance()

      const spy = jest.spyOn(observer, 'unobserve')

      wrapper.instance().handleIntersection({ isIntersecting: true })

      expect(spy).toHaveBeenCalled()
      spy.mockClear()
    })

    it('disconnects if no active image instance', () => {
      delete document.body[OBSERVER]

      const wrapper = mount(<Image src="https://picsum.photos/300/200" />)
      const { observer } = wrapper.instance()

      const spy = jest.spyOn(observer.raw, 'disconnect')

      mount(<Image src="https://picsum.photos/300/200" />).unmount()

      expect(spy).not.toHaveBeenCalled()

      wrapper.unmount()

      expect(spy).toHaveBeenCalled()
    })
  })
})
