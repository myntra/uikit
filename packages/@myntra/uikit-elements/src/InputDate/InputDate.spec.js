import React from 'react'
import { mount } from 'enzyme'
import InputDate from './InputDate'
import { presetList } from './constants'

const rangeList = [presetList.LAST_15_DAYS, presetList.LAST_30_DAYS, presetList.LAST_45_DAYS, presetList.LAST_3_MONTHS]

describe('<InputDate>', () => {
  it('should open and close correctly', () => {
    const handler = jest.fn()
    const wrapper = mount(<InputDate onChange={handler} />)
    expect(wrapper.state().isOpen).toEqual(false)

    wrapper.find('.datepickerControl').simulate('click')
    expect(wrapper.state().isOpen).toEqual(true)

    wrapper.find('.datepickerControl').simulate('keyDown', { keyCode: 27 })
    expect(wrapper.state().isOpen).toEqual(false)
  })

  it('should call change function', () => {
    const handler = jest.fn()
    const date = new Date('2018-06-15')
    const wrapper = mount(<InputDate value={date} onChange={handler} />)

    wrapper.find('.datepickerControl').simulate('click')

    expect(wrapper.find('[title="Fri Jun 15 2018"]').hasClass('gridDaySelected')).toEqual(true)

    wrapper.find('[title="Sat Jun 16 2018"]').simulate('click')
    expect(handler).toHaveBeenCalledWith(new Date('2018-06-16'))
    expect(wrapper.state().isOpen).toEqual(false)
  })

  it('date picker with range', () => {
    const handler = jest.fn()
    const wrapper = mount(<InputDate range presets={rangeList} onChange={handler} />)

    wrapper.find('.datepickerControl').simulate('click')
    wrapper
      .find('.preset_item')
      .at(0)
      .simulate('click')
    expect(wrapper.state().isOpen).toEqual(false)

    // wrapper.find('[title="Sat Jun 16 2018"]').simulate('click')
    // expect(wrapper.state().isOpen).toEqual(true)
    //
    // expect(handler).toHaveBeenCalledWith({ from: new Date('2018-06-16') })
    // wrapper.find('[title="Mon Jun 18 2018"]').simulate('click')
    // expect(wrapper.state().isOpen).toEqual(false)

    // expect(handler).toHaveBeenCalledWith({ from: new Date('2018-06-16'), to: new Date('2018-06-18') })
  })
})
