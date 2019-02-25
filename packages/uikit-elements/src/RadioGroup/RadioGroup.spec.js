import React from 'react'
import { shallow } from 'enzyme'
import RadioGroup from './RadioGroup'

const options = [{ title: '1', value: '1' }, { title: '2', value: '2' }]

it('renders <input> of type radio by default equal to number of options', () => {
  const wrapper = shallow(<RadioGroup options={options} />)
  expect(wrapper.find('[data-test-id="1"]').prop('type')).toBe('radio')
  expect(wrapper.find('[data-test-id="2"]').prop('type')).toBe('radio')
  expect(wrapper.find('input[type="radio"]')).toHaveLength(2)
})

it('should call onChange handler on text enter', () => {
  const handler = jest.fn()
  const wrapper = shallow(<RadioGroup onChange={handler} options={options} />)
  wrapper.find('[data-test-id="1"]').simulate('change', { target: { value: '1' } })
  expect(handler).toHaveBeenCalled()
})

describe('classes', () => {
  it('should render with custom class name', () => {
    expect(
      shallow(<RadioGroup className="c-name" options={options} />)
        .find('[data-test-id="group"]')
        .props().className
    ).toEqual(expect.stringContaining('c-name'))
  })
})

describe('disabled', () => {
  it('Check input element ', () => {
    expect(
      shallow(<RadioGroup disabled options={options} />)
        .find('[data-test-id="1"]')
        .props().disabled
    ).toBe(true)

    expect(
      shallow(<RadioGroup disabled={false} options={options} />)
        .find('[data-test-id="2"]')
        .props().disabled
    ).toBe(false)
  })
})

describe('render options', () => {
  it('Should use render props to render options', () => {
    const wrapper = shallow(
      <RadioGroup options={options} renderOption={o => <h1 data-test-id={`option${o.value}`}>{o.title}</h1>} />
    )
    expect(wrapper.find('[data-test-id="option1"]').text()).toEqual('1')

    expect(wrapper.find('[data-test-id="option2"]').text()).toEqual('2')
  })
})
