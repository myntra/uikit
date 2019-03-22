import React from 'react'
import { shallow } from 'enzyme'
import Tab from './Tab'

describe('Tab', () => {
  it('renders', () => {
    const wrapper = shallow(<Tab title="Title" />)

    expect(wrapper.text()).toBe('Title')

    wrapper.setProps({ title: <span>Title 2</span> })

    expect(wrapper.text()).toBe('Title 2')
    expect(wrapper.find('span')).toBeTruthy()
  })
})
