import React from 'react'
import { mount } from 'enzyme'
import Sentinel from './Sentinel'

describe('Table/Sentinel', () => {
  it('renders', () => {
    const wrapper = mount(
      <Sentinel>
        <div />
      </Sentinel>
    )

    expect(wrapper.find('div')).toHaveLength(2)
  })

  it('update sentinel on resize', () => {
    const wrapper = mount(
      <Sentinel>
        <div />
      </Sentinel>
    )

    const spy = jest.spyOn(wrapper.instance(), 'setState')

    wrapper.instance().handleResize({ bounds: { height: 0, width: 0 } })

    expect(spy).not.toHaveBeenCalled()

    wrapper.instance().handleResize({ bounds: { height: 1, width: 0 } })

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
