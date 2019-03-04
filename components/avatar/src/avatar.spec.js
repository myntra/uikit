import React from 'react'
import { shallow } from 'enzyme'
import Avatar from '/avatar'

describe('Avatar', () => {
  it('renders avatar', () => {
    const wrapper = shallow(<Avatar name="Jane Doe" />)

    expect(wrapper.find('[data-test-id="initials"]').text()).toBe('JD')
  })
})
