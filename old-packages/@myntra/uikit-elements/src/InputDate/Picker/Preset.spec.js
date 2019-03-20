import React from 'react'
import { shallow } from 'enzyme'
import Preset from './Preset'
import { YESTERDAY, LAST_7_DAYS } from '../presets'
import dayJS from 'dayjs'

const yesterday = YESTERDAY.value()

describe('render', () => {
  it('should render', () => {
    const wrapper = shallow(<Preset presets={[YESTERDAY, LAST_7_DAYS]} onChange={jest.fn()} />)

    expect(wrapper.find('.preset')).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })

  it('should highlight preset', () => {
    const wrapper = shallow(<Preset presets={[YESTERDAY, LAST_7_DAYS]} value={yesterday} onChange={jest.fn()} />)

    expect(wrapper.find('.active')).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render range', () => {
    const wrapper = shallow(<Preset presets={[YESTERDAY, LAST_7_DAYS]} onChange={jest.fn()} range />)

    expect(wrapper.find('.preset')).toHaveLength(2)
    expect(wrapper).toMatchSnapshot()
  })

  it('should highlight preset range', () => {
    const yesterday = dayJS()
      .subtract(1, 'day')
      .toDate()
    const wrapper = shallow(
      <Preset
        presets={[YESTERDAY, LAST_7_DAYS]}
        value={{ from: yesterday, to: yesterday }}
        range
        onChange={jest.fn()}
      />
    )

    expect(wrapper.find('.active')).toHaveLength(1)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('action', () => {
  it('should select', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Preset presets={[YESTERDAY, LAST_7_DAYS]} onChange={fn} />)

    wrapper
      .find('.preset')
      .at(0)
      .simulate('click')

    expect(fn).toHaveBeenCalledWith(yesterday)
  })

  it('should select (single)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Preset presets={[YESTERDAY, LAST_7_DAYS]} onChange={fn} range />)

    wrapper
      .find('.preset')
      .at(0)
      .simulate('click')

    expect(fn).toHaveBeenCalledWith({ from: yesterday, to: yesterday })
  })

  it('should render (range)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Preset presets={[YESTERDAY, LAST_7_DAYS]} onChange={fn} range />)

    wrapper
      .find('.preset')
      .at(1)
      .simulate('click')

    expect(fn).toHaveBeenCalledWith(LAST_7_DAYS.value())
  })
})
