import React from 'react'
import { mount } from 'enzyme'
import Progress from './Progress'

describe('Progress', () => {
  it('renders', () => {
    const wrapper = mount(<Progress value={0} />)

    expect(wrapper.find('ProgressCircle')).toHaveLength(1)
  })
})
