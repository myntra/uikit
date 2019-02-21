import React from 'react'
import { shallow } from 'enzyme'
import Tooltip from './Tooltip'

describe('Tooltip', () => {
  it('renders Tooltip children', () => {
    const wrapper = shallow(<Tooltip render={<div>Tooltip</div>}>Trigger</Tooltip>)
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().trigger).toEqual('Trigger')
    expect(wrapper.find('[data-test-id="content"]')).toHaveText('Tooltip')
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().up).toBeTruthy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().left).toBeTruthy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().right).toBeTruthy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().down).toBeFalsy()
  })

  it('renders Tooltip up when position prop is down', () => {
    const wrapper = shallow(
      <Tooltip position="down" render={<div>Trigger</div>}>
        Tooltip
      </Tooltip>
    )
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().up).toBeFalsy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().left).toBeTruthy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().right).toBeTruthy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().down).toBeTruthy()
  })

  it('renders Tooltip up when position prop is left', () => {
    const wrapper = shallow(
      <Tooltip position="left" render={<div>Trigger</div>}>
        Tooltip
      </Tooltip>
    )
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().up).toBeFalsy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().left).toBeTruthy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().right).toBeFalsy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().down).toBeFalsy()
  })

  it('renders Tooltip up when position prop is right', () => {
    const wrapper = shallow(
      <Tooltip position="right" render={<div>Trigger</div>}>
        Tooltip
      </Tooltip>
    )
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().up).toBeFalsy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().left).toBeFalsy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().right).toBeTruthy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().down).toBeFalsy()
  })
})

describe('Tooltip behaviour', () => {
  it('renders tooltip content on hover', () => {
    const wrapper = shallow(<Tooltip render={<div>Tooltip</div>}>Trigger</Tooltip>)
    wrapper
      .find('[data-test-id="tooltip-trigger"]')
      .dive()
      .find('[data-test-id="trigger"]')
      .childAt(0)
      .simulate('mouseenter')
    expect(wrapper.state('open')).toBeTruthy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().isOpen).toBeTruthy()
  })

  it('closes tooltip content on moving away', () => {
    const wrapper = shallow(<Tooltip render={<div>Tooltip</div>}>Trigger</Tooltip>)
    wrapper.setState({ open: true })
    wrapper
      .find('[data-test-id="tooltip-trigger"]')
      .dive()
      .find('[data-test-id="trigger"]')
      .childAt(0)
      .simulate('mouseleave')
    expect(wrapper.state('open')).toBeFalsy()
    expect(wrapper.find('[data-test-id="tooltip-trigger"]').props().isOpen).toBeFalsy()
  })
})
