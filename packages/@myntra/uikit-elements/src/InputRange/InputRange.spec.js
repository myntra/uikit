import React from 'react'
import { shallow, mount } from 'enzyme'

import InputRange from './InputRange'

describe('InputRange', () => {
  describe('#members', () => {
    it('check precision', () => {
      const wrapper = shallow(<InputRange min={0} max={10} step={1} value={5} />)
      const instance = wrapper.instance()
      expect(instance.precision).toBe(0)
      wrapper.setProps({ min: 0.1 })
      expect(instance.precision).toBe(1)
      wrapper.setProps({ step: 1.25 })
      expect(instance.precision).toBe(2)
      wrapper.setProps({ max: 12.358 })
      expect(instance.precision).toBe(3)
    })

    it('check pressed state', () => {
      const wrapper = mount(<InputRange min={0} max={10} step={0.1} value={5} />)
      expect(wrapper.state().pressed).toBe(false)
      wrapper.find('.knob-value').simulate('mouseDown')
      expect(wrapper.state().pressed).toBe(true)
    })
  })

  describe('#render', () => {
    it('render proper slider with provided value', () => {
      const wrapper = shallow(<InputRange min={500} max={1000} value={750} />)
      const instance = wrapper.instance()
      expect(wrapper.find('.inner-knob').prop('style').left).toBe(`${100 * instance.knobOffset()}%`)
      expect(wrapper.find('.track-value').prop('style').transform).toBe(`scaleX(${instance.knobOffset()})`)
      wrapper.unmount()
    })

    it('render disabled slider', () => {
      const wrapper = shallow(<InputRange disabled min={500} max={1000} value={750} />)
      expect(wrapper.hasClass('disabled')).toBe(true)
    })

    it('contains hidden input of type range', () => {
      const wrapper = shallow(<InputRange min={100} max={1000} value={140} />)
      const instance = wrapper.instance()
      expect(wrapper.find('input')).toHaveLength(1)
      expect(wrapper.find('input').prop('type')).toEqual('range')
      expect(wrapper.find('input').prop('min')).toEqual(instance.props.min)
      expect(wrapper.find('input').prop('max')).toEqual(instance.props.max)
      expect(wrapper.find('input').prop('step')).toEqual(instance.props.step)
      expect(wrapper.find('input').prop('value')).toEqual(instance.props.value)
    })
  })

  describe('#events', () => {
    it('sets pressed state when knob is clicked', () => {
      const wrapper = mount(<InputRange />)
      wrapper.find('.knob-value').simulate('mouseDown')
      expect(wrapper.state().pressed).toEqual(true)
      expect(wrapper.find('.knob-value').hasClass('knob-pressed')).toBe(true)
    })

    it('sets pressed state when knob is touched', () => {
      const wrapper = mount(<InputRange />)
      wrapper.find('.knob-value').simulate('touchStart', { touches: [{ pageX: 200 }] })
      expect(wrapper.state().pressed).toEqual(true)
    })

    it('sets a proper value when the slider is clicked', () => {
      const onChange = jest.fn()
      const wrapper = mount(<InputRange min={300} max={600} onChange={onChange} />)
      wrapper.instance().trackNode.getBoundingClientRect = () => ({ left: 0, right: 1000 })
      wrapper.find('.track-value').simulate('mouseDown', { pageX: 500 }) // Center of slider
      expect(onChange).toHaveBeenCalledWith(450) // 300 + (600 - 300) / 2
    })

    it('sets a proper value when the slider is touched', () => {
      const onChange = jest.fn()
      const wrapper = mount(<InputRange min={200} max={2200} onChange={onChange} />)
      wrapper.instance().trackNode.getBoundingClientRect = () => ({ left: 0, right: 1000 })
      wrapper.find('.track-value').simulate('touchStart', { touches: [{ pageX: 250 }] }) // 1/4th of slider
      expect(onChange).toHaveBeenCalledWith(700) // 200 + (2200 - 200) / 4
    })

    it('returns min when min is greater than max prop', () => {
      const onChange = jest.fn()
      const wrapper = mount(<InputRange min={2000} max={200} onChange={onChange} />)
      wrapper.instance().trackNode.getBoundingClientRect = () => ({ left: 0, right: 1000 })
      wrapper.find('.track-value').simulate('mouseDown', { pageX: 400 })
      expect(onChange).toHaveBeenCalledWith(2000)
      wrapper.find('.track-value').simulate('touchStart', { touches: [{ pageX: 400 }] })
      expect(onChange).toHaveBeenCalledWith(2000)
    })

    it('returns max when calculated value is greater than max prop', () => {
      const onChange = jest.fn()
      const wrapper = mount(<InputRange min={200} max={2000} onChange={onChange} />)
      wrapper.instance().trackNode.getBoundingClientRect = () => ({ left: 0, right: 1000 })
      wrapper.find('.track-value').simulate('mouseDown', { pageX: 1100 })
      expect(onChange).toHaveBeenCalledWith(2000)
      wrapper.find('.track-value').simulate('touchStart', { touches: [{ pageX: 400 }] })
      expect(onChange).toHaveBeenCalledWith(2000)
    })

    it('should ignore change events if no change handler', () => {
      const wrapper = mount(<InputRange min={200} max={2200} />)
      wrapper.instance().trackNode.getBoundingClientRect = () => ({ left: 0, right: 1000 })
      wrapper.find('.knob-value').simulate('mouseDown')
      wrapper.find('.knob-value').simulate('touchStart', { touches: [{ pageX: 200 }] })
      wrapper.find('.track-value').simulate('mouseDown', { pageX: 500 })
      wrapper.find('.track-value').simulate('touchStart', { touches: [{ pageX: 250 }] })
    })
  })
})
