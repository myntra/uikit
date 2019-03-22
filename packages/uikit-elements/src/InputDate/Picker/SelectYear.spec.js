import React from 'react'
import { shallow } from 'enzyme'
import SelectYear from './SelectYear'

describe('render', () => {
  it('should render', () => {
    const wrapper = shallow(<SelectYear year={2018} onYearSelect={jest.fn()} title="year" />)
    const options = wrapper.find('option')

    expect(options).toHaveLength(20)
    expect(options.at(0).text()).toBe('2008')
    expect(options.at(19).text()).toBe('2027')
    expect(wrapper).toMatchSnapshot()
  })

  it('should render 0 year', () => {
    const wrapper = shallow(<SelectYear year={2} onYearSelect={jest.fn()} title="year" />)
    const options = wrapper.find('option')

    expect(options).toHaveLength(20)
    expect(options.at(0).text()).toBe('0')
    expect(options.at(19).text()).toBe('19')
    expect(wrapper).toMatchSnapshot()
  })
})

describe('action', () => {
  it('select', () => {
    const fn = jest.fn()
    const wrapper = shallow(<SelectYear year={2018} onYearSelect={fn} />)

    wrapper.find('select').simulate('change', { target: { value: '2017' } })

    expect(fn).toHaveBeenCalledWith(2017)
  })
})
