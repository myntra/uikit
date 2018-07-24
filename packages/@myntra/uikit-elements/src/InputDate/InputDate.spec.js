import React from 'react'
import { shallow } from 'enzyme'
import InputDate from './InputDate'
import Dropdown from '../Dropdown/Dropdown'
import { UTCDate } from './InputDateUtils'
import InputDatePicker from './InputDatePicker'
import InputDateValue from './InputDateValue'
import { testCodeMod } from '@myntra/codemod-utils'

testCodeMod(__dirname, 'InputDate.codemod.js')

describe('render', () => {
  it('simple', () => {
    const wrapper = shallow(<InputDate presets={[]} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('range', () => {
    const wrapper = shallow(<InputDate range />)

    expect(wrapper).toMatchSnapshot()
  })
})

const DATE = UTCDate(2018, 4, 5)
describe('date to open', () => {
  test('default to null', () => {
    const wrapper = shallow(<InputDate />)
    const instance = wrapper.instance()
    expect(instance.openToDate).toEqual(null)

    wrapper.find(InputDatePicker).simulate('openToDateChange', DATE)

    expect(instance.openToDate).toEqual(DATE)
  })

  test('value', () => {
    const wrapper = shallow(<InputDate value={DATE} />)
    const instance = wrapper.instance()
    expect(instance.openToDate).toEqual(DATE)

    wrapper.setState({ openToDate: UTCDate(2017, 4, 5) })
    expect(instance.openToDate).toEqual(UTCDate(2017, 4, 5))
  })

  test('date range', () => {
    const wrapper = shallow(<InputDate />)
    const instance = wrapper.instance()
    wrapper.setProps({ range: true, value: { from: DATE } })
    expect(instance.openToDate).toEqual(DATE)

    wrapper.setProps({ range: true, value: { to: DATE } })
    expect(instance.openToDate).toEqual(DATE)

    wrapper.setProps({ range: true, value: { from: DATE } })
    wrapper.setState({ activeRangeEnd: 'to' })
    expect(instance.openToDate).toEqual(DATE)
  })
})

test('active range end', () => {
  const wrapper = shallow(<InputDate range />)
  const instance = wrapper.instance()
  expect(instance.displayActiveRangeEnd).toEqual(null)

  wrapper.setState({ isOpen: true })
  expect(instance.displayActiveRangeEnd).toEqual('from')

  wrapper.setProps({ value: { from: DATE } })
  expect(instance.displayActiveRangeEnd).toEqual('to')

  wrapper.setState({ activeRangeEnd: 'from' })
  expect(instance.displayActiveRangeEnd).toEqual('from')
})

test('display format', () => {
  const wrapper = shallow(<InputDate />)
  const instance = wrapper.instance()
  expect(instance.displayFormat).toEqual('yyyy-MM-dd')

  wrapper.setProps({ format: 'yyyy/MM/dd' })
  expect(instance.displayFormat).toEqual('yyyy/MM/dd')

  wrapper.setProps({ displayFormat: 'yy/MM/dd' })
  expect(instance.displayFormat).toEqual('yy/MM/dd')
})

test('display value', () => {
  const wrapper = shallow(<InputDate />)
  const instance = wrapper.instance()

  expect(instance.displayValue).toEqual('')

  wrapper.setProps({ range: true })
  expect(instance.displayValue).toEqual({})
})

describe('value change', () => {
  test('date', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDate onChange={fn} />)

    wrapper.find(InputDatePicker).simulate('change', DATE)

    expect(fn).toHaveBeenCalledWith(DATE)
  })

  test('date range', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDate onChange={fn} value={{ from: DATE }} range />)

    wrapper.find(InputDatePicker).simulate('change', { to: DATE })

    expect(fn).toHaveBeenCalledWith({ to: DATE })
  })
})

describe('display value change', () => {
  test('no onChange', () => {
    const wrapper = shallow(<InputDate />)

    expect(() => {
      wrapper
        .find(Dropdown)
        .dive()
        .find(InputDateValue)
        .simulate('change', DATE)
    }).not.toThrow()
  })

  test('date', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDate onChange={fn} />)

    wrapper
      .find(Dropdown)
      .dive()
      .find(InputDateValue)
      .simulate('change', DATE)

    expect(fn).toHaveBeenCalledWith(DATE)
  })

  test('date (string)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDate onChange={fn} format="yyyy-MM-dd" />)

    wrapper
      .find(Dropdown)
      .dive()
      .find(InputDateValue)
      .simulate('change', DATE)

    expect(fn).toHaveBeenCalledWith('2018-05-05')
  })

  test('date range', () => {
    const fn = jest.fn()
    const DATE2 = UTCDate(2018, 3, 5)
    const wrapper = shallow(<InputDate onChange={fn} value={{ from: DATE }} range />)

    wrapper
      .find(Dropdown)
      .dive()
      .find(InputDateValue)
      .simulate('change', { to: DATE2 })

    expect(fn).toHaveBeenCalledWith({ from: DATE2, to: DATE })

    wrapper.setProps({ value: {} })
    wrapper
      .find(Dropdown)
      .dive()
      .find(InputDateValue)
      .simulate('change', { to: DATE2 })

    expect(fn).toHaveBeenCalledWith({ to: DATE2 })
  })

  test('date range (string)', () => {
    const fn = jest.fn()
    const wrapper = shallow(<InputDate onChange={fn} value={{ from: DATE }} range format="yyyy-MM-dd" />)

    wrapper
      .find(Dropdown)
      .dive()
      .find(InputDateValue)
      .simulate('change', { to: UTCDate(2018, 3, 5) })

    expect(fn).toHaveBeenCalledWith({ from: '2018-04-05', to: '2018-05-05' })
  })

  test('range focus', () => {
    const wrapper = shallow(<InputDate />)
    wrapper
      .find(Dropdown)
      .dive()
      .find(InputDateValue)
      .simulate('rangeFocus', 'foo')

    expect(wrapper.state().activeRangeEnd).toBe('foo')
  })
})

describe('next selection', () => {
  const wrapper = shallow(<InputDate range />)
  const FROM = UTCDate(2018, 3, 5)
  const TO = UTCDate(2018, 5, 5)

  beforeEach(() => {
    wrapper.setState({
      isOpen: false
    })
  })

  afterEach(() => {
    wrapper.setProps({ value: undefined, range: true })
    wrapper.setState({
      isOpen: false,
      openToDate: null,
      activeRangeEnd: null,
      isRangeSelectionActive: false
    })
  })

  test('select from', () => {
    wrapper.find(InputDatePicker).simulate('change', { from: FROM })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('to')
  })

  test('select to', () => {
    wrapper.find(InputDatePicker).simulate('change', { to: TO })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('from')
  })

  test('select none', () => {
    wrapper.find(InputDatePicker).simulate('change', {})

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('from')
  })

  test('select from when to selected', () => {
    wrapper.setProps({ value: { to: TO } })
    wrapper.find(InputDatePicker).simulate('change', { from: FROM })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('to')
  })

  test('select to when to selected', () => {
    wrapper.setProps({ value: { to: TO } })
    wrapper.find(InputDatePicker).simulate('change', { to: DATE })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('from')
  })

  test('select both when to selected', () => {
    wrapper.setProps({ value: { to: DATE } })
    wrapper.find(InputDatePicker).simulate('change', { from: FROM, to: TO })

    expect(wrapper.state().isRangeSelectionActive).toBe(false)
    expect(wrapper.state().activeRangeEnd).toBe(null)
  })

  test('select both (swap) when to selected', () => {
    wrapper.setProps({ value: { to: DATE } })
    wrapper.find(InputDatePicker).simulate('change', { from: DATE, to: TO })

    expect(wrapper.state().isRangeSelectionActive).toBe(false)
    expect(wrapper.state().activeRangeEnd).toBe(null)
  })

  test('select from when from selected', () => {
    wrapper.setProps({ value: { from: FROM } })
    wrapper.find(InputDatePicker).simulate('change', { from: DATE })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('to')
  })

  test('select to when from selected', () => {
    wrapper.setProps({ value: { from: FROM } })
    wrapper.find(InputDatePicker).simulate('change', { to: TO })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('from')
  })

  test('select both when from selected', () => {
    wrapper.setProps({ value: { from: DATE } })
    wrapper.find(InputDatePicker).simulate('change', { from: FROM, to: TO })

    expect(wrapper.state().isRangeSelectionActive).toBe(false)
    expect(wrapper.state().activeRangeEnd).toBe(null)
  })

  test('select both (swap from) when from selected', () => {
    wrapper.setProps({ value: { from: DATE } })
    wrapper.find(InputDatePicker).simulate('change', { from: FROM, to: DATE })

    expect(wrapper.state().isRangeSelectionActive).toBe(false)
    expect(wrapper.state().activeRangeEnd).toBe(null)
  })

  test('select from when both selected', () => {
    wrapper.setProps({ value: { from: DATE, to: TO } })
    wrapper.find(InputDatePicker).simulate('change', { from: FROM })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('to')
  })

  test('select to when both selected', () => {
    wrapper.setProps({ value: { from: FROM, to: TO } })
    wrapper.find(InputDatePicker).simulate('change', { to: TO })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('from')
  })

  test('select both when both selected', () => {
    wrapper.setProps({ value: { from: FROM, to: TO } })
    wrapper.find(InputDatePicker).simulate('change', { from: DATE, to: DATE })

    expect(wrapper.state().isRangeSelectionActive).toBe(false)
    expect(wrapper.state().activeRangeEnd).toBe(null)
  })

  test('select edit from when both selected', () => {
    wrapper.setProps({ value: { from: DATE, to: TO } })
    wrapper.find(InputDatePicker).simulate('change', { from: FROM, to: TO })

    expect(wrapper.state().isRangeSelectionActive).toBe(true)
    expect(wrapper.state().activeRangeEnd).toBe('to')
  })

  test('select edit to when both selected', () => {
    wrapper.setProps({ value: { from: FROM, to: DATE } })
    wrapper.find(InputDatePicker).simulate('change', { from: FROM, to: TO })

    expect(wrapper.state().isRangeSelectionActive).toBe(false)
    expect(wrapper.state().activeRangeEnd).toBe(null)
  })

  test('select both (swap from) when both selected', () => {
    wrapper.setProps({ value: { from: DATE, to: TO } })
    wrapper.find(InputDatePicker).simulate('change', { from: FROM, to: DATE })

    expect(wrapper.state().isRangeSelectionActive).toBe(false)
    expect(wrapper.state().activeRangeEnd).toBe(null)
  })
})

describe('dropdown', () => {
  const wrapper = shallow(<InputDate />)

  wrapper.instance().dropdownRef({
    close() {
      wrapper.find(Dropdown).simulate('close')
    }
  })

  beforeEach(() => {
    wrapper.setState({ isOpen: true })
  })

  describe('open/close', () => {
    const wrapper = shallow(<InputDate />)

    expect(wrapper.state().isOpen).toBe(false)

    wrapper.find(Dropdown).simulate('open')
    expect(wrapper.state().isOpen).toBe(true)

    wrapper.find(Dropdown).simulate('close')
    expect(wrapper.state().isOpen).toBe(false)
  })

  test('force close', () => {
    wrapper.instance().close()
    expect(wrapper.state().isOpen).toBe(false)
  })

  test('close if active element is outside', () => {
    const EVENT_WITH_PATH = { path: [1] }
    const EVENT_WITH_COMPOSED_PATH = { composedPath: () => [1] }
    const EVENT_WITH_CURRENT_TARGET = { currentTarget: { contains: a => [1].includes(a) } }

    wrapper.setState({ isOpen: true })
    wrapper.instance().closeIfElementIsOutsideTarget(EVENT_WITH_PATH, 0)
    expect(wrapper.state().isOpen).toBe(false)

    wrapper.setState({ isOpen: true })
    wrapper.instance().closeIfElementIsOutsideTarget(EVENT_WITH_PATH, 1)
    expect(wrapper.state().isOpen).toBe(true)

    wrapper.setState({ isOpen: true })
    wrapper.instance().closeIfElementIsOutsideTarget(EVENT_WITH_COMPOSED_PATH, 0)
    expect(wrapper.state().isOpen).toBe(false)

    wrapper.setState({ isOpen: true })
    wrapper.instance().closeIfElementIsOutsideTarget(EVENT_WITH_COMPOSED_PATH, 1)
    expect(wrapper.state().isOpen).toBe(true)

    wrapper.setState({ isOpen: true })
    wrapper.instance().closeIfElementIsOutsideTarget(EVENT_WITH_CURRENT_TARGET, 0)
    expect(wrapper.state().isOpen).toBe(false)

    wrapper.setState({ isOpen: true })
    wrapper.instance().closeIfElementIsOutsideTarget(EVENT_WITH_CURRENT_TARGET, 1)
    expect(wrapper.state().isOpen).toBe(true)
  })
})
