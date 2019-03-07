import React from 'react'
import { shallow } from 'enzyme'
import Text from './Text.jsx'

describe('Text', () => {
  it('renders text', () => {
    const wrapper = shallow(<Text>Example</Text>)

    expect(wrapper.find('span')).toHaveLength(1)
    expect(wrapper.text()).toBe('Example')
  })

  it('renders html', () => {
    const wrapper = shallow(
      <Text>
        <p>Example</p>
      </Text>
    )

    expect(wrapper.find('span')).toHaveLength(0)
    expect(wrapper.find('p')).toHaveLength(1)
    expect(wrapper.text()).toBe('Example')
  })

  it('preserves original classes', () => {
    const wrapper = shallow(
      <Text>
        <p className="foo bar">Example</p>
      </Text>
    )

    expect(wrapper.hasClass('foo')).toBe(true)
    expect(wrapper.hasClass('bar')).toBe(true)
  })

  it('allows style & color customisation', () => {
    const wrapper = shallow(
      <Text style="title" color="dark">
        Example
      </Text>
    )

    expect(wrapper.hasClass('title')).toBe(true)
    expect(wrapper.hasClass('dark')).toBe(true)
  })
})
