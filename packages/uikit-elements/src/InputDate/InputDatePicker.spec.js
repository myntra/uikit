import React from 'react'
import { shallow } from 'enzyme'
import InputDatePicker from './InputDatePicker'
import { UTCDate } from './InputDateUtils'

describe('normalize dates', () => {
  const wrapper = shallow(<InputDatePicker format="yyyy-MM-dd" presets />)
  const picker = wrapper.instance()
  const DATE = UTCDate(2018, 4, 5)
  const date = '2018-05-05'

  expect(wrapper).toMatchSnapshot()

  test('null', () => expect(picker.normalize(null)).toEqual(null))
  test('undefined', () => expect(picker.normalize(undefined)).toEqual(null))
  test('Date', () => expect(picker.normalize(DATE)).toEqual(DATE))
  test('string', () => expect(picker.normalize(date)).toEqual(DATE))
  test('range', () => expect(picker.normalize({ from: date, to: DATE })).toEqual({ from: DATE, to: DATE }))
  test('everything else', () => expect(picker.normalize(1)).toEqual(null))

  test('onChange', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDatePicker format="yyyy-MM-dd" onChange={fn} presets={[]} />)
    wrapper.instance().handleChange(DATE)
    expect(fn).toHaveBeenCalledWith(date)
    expect(wrapper).toMatchSnapshot()
  })

  test('no onChange', () => {
    const wrapper = shallow(<InputDatePicker format="yyyy-MM-dd" />)
    expect(() => wrapper.instance().handleChange(DATE)).not.toThrow()
  })
})

describe('no normalization required', () => {
  const DATE = UTCDate(2018, 4, 5)

  test('onChange', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDatePicker onChange={fn} />)
    wrapper.instance().handleChange(DATE)
    expect(fn).toHaveBeenCalledWith(DATE)
  })

  test('no onChange', () => {
    const wrapper = shallow(<InputDatePicker />)
    expect(() => wrapper.instance().handleChange(DATE)).not.toThrow()
  })
})

test('validate props', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  shallow(<InputDatePicker value="2018-05-05" />)
  expect(consoleError).toHaveBeenCalledWith(expect.stringContaining(`Set 'format'`))
  consoleError.mockReset()
})
