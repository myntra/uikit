import React from 'react'
import { shallow } from 'enzyme'
import Day from './Day'
import { UTCDate } from '../InputDateUtils'

describe('render', () => {
  it('should render empty day', () => {
    const wrapper = shallow(<Day />)

    expect(wrapper.text()).toBe('0')
    expect(wrapper.hasClass('empty')).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a day', () => {
    const wrapper = shallow(<Day year={2018} month={6} day={10} />)

    expect(wrapper.text()).toBe('10')
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a focused/disabled/selected day', () => {
    const wrapper = shallow(<Day year={2018} month={6} day={10} focused disabled selected />)

    expect(wrapper.text()).toBe('10')
    expect(wrapper.hasClass('focused')).toBe(true)
    expect(wrapper.hasClass('selected')).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a selection start/end day', () => {
    const wrapper = shallow(<Day year={2018} month={6} day={10} selected isSelectionStart isSelectionEnd />)

    expect(wrapper.text()).toBe('10')
    expect(wrapper.hasClass('start')).toBe(true)
    expect(wrapper.hasClass('end')).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('should highlight current date', () => {
    const date = new Date()
    const wrapper = shallow(<Day year={date.getFullYear()} month={date.getMonth()} day={date.getDate()} />)

    expect(wrapper.hasClass('today')).toBe(true)
  })

  it('should warn for invalid date', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

    shallow(<Day year={2018} month={5} day={35} />)
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('Invalid date'))

    consoleError.mockRestore()
  })
})

describe('mouse actions', () => {
  describe('focus', () => {
    it('should trigger focus on hover', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onFocus={fn} />)

      wrapper.simulate('mouseenter')

      expect(fn).toHaveBeenCalledWith(UTCDate(2018, 5, 10))
    })

    it('should not trigger focus for empty day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day onFocus={fn} />)

      wrapper.simulate('mouseenter')

      expect(fn).toHaveBeenCalledWith(null)
    })

    it('should not trigger focus for disabled day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onFocus={fn} disabled />)

      wrapper.simulate('mouseenter')

      expect(fn).toHaveBeenCalledWith(null)
    })

    it('should not trigger focus for focused day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onFocus={fn} focused />)

      wrapper.simulate('mouseenter')

      expect(fn).not.toHaveBeenCalled()
    })

    it('should work without onFocus', () => {
      const wrapper = shallow(<Day year={2018} month={5} day={10} />)

      expect(() => wrapper.simulate('mouseenter')).not.toThrow()
    })
  })

  describe('blur', () => {
    it('should trigger blur', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onFocus={fn} focused />)

      wrapper.simulate('mouseleave')

      expect(fn).toHaveBeenCalledWith(null)
    })

    it('should not trigger focus for empty day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day onFocus={fn} />)

      wrapper.simulate('mouseleave')

      expect(fn).not.toHaveBeenCalled()
    })

    it('should not trigger focus for disabled day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onFocus={fn} disabled />)

      wrapper.simulate('mouseleave')

      expect(fn).not.toHaveBeenCalled()
    })

    it('should not trigger focus for un-focused day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onFocus={fn} />)

      wrapper.simulate('mouseleave')

      expect(fn).not.toHaveBeenCalled()
    })

    it('should work without onFocus', () => {
      const wrapper = shallow(<Day year={2018} month={5} day={10} />)

      expect(() => wrapper.simulate('mouseleave')).not.toThrow()
    })
  })

  describe('select', () => {
    it('should trigger select', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onSelect={fn} focused />)

      wrapper.simulate('mousedown')

      expect(fn).toHaveBeenCalledWith(UTCDate(2018, 5, 10))
    })

    it('should not trigger select for empty day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day onSelect={fn} />)

      wrapper.simulate('mousedown')

      expect(fn).not.toHaveBeenCalled()
    })

    it('should not trigger select for disabled day & stop event propagation', () => {
      const fn = jest.fn()
      const stopPropagation = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onSelect={fn} disabled />)

      wrapper.simulate('mousedown', { stopPropagation })

      expect(fn).not.toHaveBeenCalled()
      expect(stopPropagation).toHaveBeenCalled()
    })

    it('should not trigger select for selected day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onSelect={fn} selected />)

      wrapper.simulate('mousedown')

      expect(fn).not.toHaveBeenCalled()
    })

    it('should work without onSelect', () => {
      const wrapper = shallow(<Day year={2018} month={5} day={10} />)

      expect(() => wrapper.simulate('mousedown')).not.toThrow()
    })
  })

  describe('select on touch devices', () => {
    it('should trigger select', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onSelect={fn} focused />)

      wrapper.simulate('touchstart')
      wrapper.simulate('touchend')

      expect(fn).toHaveBeenCalledWith(UTCDate(2018, 5, 10))
    })

    it('should not trigger select for empty day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day onSelect={fn} />)

      wrapper.simulate('touchstart')
      wrapper.simulate('touchend')

      expect(fn).not.toHaveBeenCalled()
    })

    it('should not trigger select for disabled day & stop event propagation', () => {
      const fn = jest.fn()
      const stopPropagation = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onSelect={fn} disabled />)

      wrapper.simulate('touchstart')
      wrapper.simulate('touchend', { stopPropagation })

      expect(fn).not.toHaveBeenCalled()
      expect(stopPropagation).toHaveBeenCalled()
    })

    it('should not trigger select for selected day', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onSelect={fn} selected />)

      wrapper.simulate('touchstart')
      wrapper.simulate('touchend')

      expect(fn).not.toHaveBeenCalled()
    })

    it('should work without onSelect', () => {
      const wrapper = shallow(<Day year={2018} month={5} day={10} />)

      expect(() => {
        wrapper.simulate('touchstart')
        wrapper.simulate('touchend')
      }).not.toThrow()
    })

    it('should ignore swipe/drag actions', () => {
      const fn = jest.fn()
      const wrapper = shallow(<Day year={2018} month={5} day={10} onSelect={fn} focused />)

      wrapper.simulate('touchstart')
      wrapper.simulate('touchmove')
      wrapper.simulate('touchend')

      expect(fn).not.toHaveBeenCalled()
    })
  })
})
