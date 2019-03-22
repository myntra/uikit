import React from 'react'
import { shallow } from 'enzyme'
import SelectMonth from './SelectMonth'

describe('render', () => {
  it('should render', () => {
    const wrapper = shallow(<SelectMonth month={5} onMonthSelect={jest.fn()} title="month" />)
    const options = wrapper.find('option')

    expect(options).toHaveLength(12)
    expect(options.at(0).text()).toBe('Jan')
    expect(options.at(11).text()).toBe('Dec')
    expect(wrapper).toMatchSnapshot()
  })
})

describe('action', () => {
  it('select', () => {
    const fn = jest.fn()
    const wrapper = shallow(<SelectMonth month={5} onMonthSelect={fn} />)

    wrapper.find('select').simulate('change', { target: { value: '5' } })

    expect(fn).toHaveBeenCalledWith(5)
  })
})
