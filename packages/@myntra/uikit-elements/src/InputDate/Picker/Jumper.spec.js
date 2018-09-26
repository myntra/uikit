import React from 'react'
import { shallow } from 'enzyme'
import Jumper from './Jumper'
import SelectMonth from './SelectMonth'
import SelectYear from './SelectYear'
import { Icon } from '../..'
import { UTCDate } from '../InputDateUtils'

describe('render', () => {
  it('should render', () => {
    const wrapper = shallow(<Jumper year={2018} month={5} offset={0} onJump={jest.fn()} />)

    expect(wrapper.find(SelectMonth)).toBeTruthy()
    expect(wrapper.find(SelectYear)).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render next/prev', () => {
    const wrapper = shallow(<Jumper year={2018} month={5} offset={0} onJump={jest.fn()} hasNext hasPrev />)
    const icons = wrapper.find(Icon)

    expect(icons).toHaveLength(2)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('action', () => {
  it('year jump', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Jumper year={2018} month={5} offset={0} onJump={fn} />)
    const year = wrapper.find(SelectYear)

    year.props().onYearSelect(2019)

    expect(fn).toHaveBeenCalledWith(UTCDate(2019, 5, 1))
  })

  it('month jump', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Jumper year={2018} month={5} offset={0} onJump={fn} />)
    const month = wrapper.find(SelectMonth)

    month.props().onMonthSelect(2)

    expect(fn).toHaveBeenCalledWith(UTCDate(2018, 2, 1))
  })

  it('month next jump', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Jumper year={2018} month={5} offset={0} onJump={fn} hasNext />)
    const month = wrapper.find('.next')

    month.simulate('click')

    expect(fn).toHaveBeenCalledWith(UTCDate(2018, 6, 1))
  })

  it('month prev jump', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Jumper year={2018} month={5} offset={0} onJump={fn} hasPrev />)
    const month = wrapper.find('.prev')

    month.simulate('click')

    expect(fn).toHaveBeenCalledWith(UTCDate(2018, 4, 1))
  })
})
