import React from 'react'
import { shallow, mount } from 'enzyme'
import Month from './Month'
import Day from './Day'
import { UTCDate } from '../InputDateUtils'

describe('render', () => {
  it('should render', () => {
    const wrapper = shallow(<Month year={2018} month={4} />)
    const days = wrapper.find(Day)

    expect(days).toHaveLength(35)
    expect(days.at(2).props().day).toBe(1)
    expect(wrapper).toMatchSnapshot()
  })

  it('should focus date', () => {
    const wrapper = shallow(<Month year={2018} month={4} focused={1} />)
    const days = wrapper.find(Day)

    expect(days).toHaveLength(35)
    expect(days.at(2).props().day).toBe(1)
    expect(days.at(2).props().focused).toBe(true)
  })

  it('should render selected date', () => {
    const wrapper = shallow(<Month year={2018} month={4} selected={{ from: 1, to: 5 }} />)
    const days = wrapper.find(Day)

    expect(days.at(1).props().selected).toBe(false) // empty
    expect(days.at(2).props().selected).toBe(true) // 1
    expect(days.at(7).props().selected).toBe(false) // 6
  })

  it('should render selected date spanning multiple months (start)', () => {
    const wrapper = shallow(<Month year={2018} month={4} selected={{ from: 0, to: 5 }} />)
    const days = wrapper.find(Day)

    expect(days.at(1).props().selected).toBe(true) // empty
    expect(days.at(2).props().selected).toBe(true) // 1
    expect(days.at(7).props().selected).toBe(false) // 6
  })

  it('should render selected date spanning multiple months (end)', () => {
    const wrapper = shallow(<Month year={2018} month={4} selected={{ from: 2, to: 32 }} />)
    const days = wrapper.find(Day)

    expect(days.at(1).props().selected).toBe(false) // empty
    expect(days.at(4).props().selected).toBe(true) // 3
    expect(days.at(34).props().selected).toBe(true) // 6
  })

  it('should render disabled date', () => {
    const wrapper = shallow(<Month year={2018} month={4} disabled={[{ from: 1, to: 5 }, { from: 10, to: 15 }]} />)
    const days = wrapper.find(Day)

    expect(days.at(1).props().disabled).toBe(false) // empty
    expect(days.at(2).props().disabled).toBe(true) // 1
    expect(days.at(7).props().disabled).toBe(false) // 6
    expect(days.at(11).props().disabled).toBe(true) // 10
    expect(days.at(17).props().disabled).toBe(false) // 16
  })

  it('should render children', () => {
    const wrapper = shallow(
      <Month year={2018} month={4}>
        <span className="test-child">Foo</span>
      </Month>
    )

    expect(wrapper.find('.test-child').text()).toBe('Foo')
  })
})

describe('interaction', () => {
  describe('focus', () => {
    it('should trigger focus', () => {
      const fn = jest.fn()
      const wrapper = mount(<Month year={2018} month={4} onDateFocus={fn} />)

      wrapper
        .find(Day)
        .at(2)
        .simulate('mouseenter')

      expect(fn).toHaveBeenCalledWith(1, UTCDate(2018, 4, 1))
    })

    it('should trigger focus on empty day', () => {
      const fn = jest.fn()
      const wrapper = mount(<Month year={2018} month={4} onDateFocus={fn} />)

      wrapper
        .find(Day)
        .at(0)
        .simulate('mouseenter')

      expect(fn).toHaveBeenCalledWith(null, null)
    })

    it('should work without onDateFocus', () => {
      const wrapper = mount(<Month year={2018} month={4} />)

      expect(() =>
        wrapper
          .find(Day)
          .at(2)
          .simulate('mouseenter')
      ).not.toThrow()
    })
  })

  describe('select', () => {
    it('should trigger select', () => {
      const fn = jest.fn()
      const wrapper = mount(<Month year={2018} month={4} onDateSelect={fn} />)

      wrapper
        .find(Day)
        .at(2)
        .simulate('mousedown')

      expect(fn).toHaveBeenCalledWith(1, UTCDate(2018, 4, 1))
    })

    it('should work without onDateSelect', () => {
      const wrapper = mount(<Month year={2018} month={4} />)

      expect(() =>
        wrapper
          .find(Day)
          .at(2)
          .simulate('mousedown')
      ).not.toThrow()
    })
  })
})
