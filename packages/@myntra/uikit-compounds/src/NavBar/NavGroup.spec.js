import React from 'react'
import { mount } from 'enzyme'
import NavGroup from './NavGroup'
import NavItem from './NavItem'

describe('NavBar Group', () => {
  it('should render list item with title text', () => {
    const navGroup = mount(<NavGroup title="Group" />)
    navGroup.setProps({
      children: [<NavItem key="groupitem0" title="GroupItem1" />]
    })
    expect(navGroup.find('.group > .title').text()).toEqual('Group')

    expect(navGroup.find('NavItem')).toHaveLength(1)
    expect(navGroup.find('NavItem').text()).toEqual('GroupItem1')
  })

  it('should not display text if NavBar is collapsed', () => {
    const navGroup = mount(<NavGroup title="Group" collapsed />)
    expect(navGroup.find('.group.collapsed').text()).toEqual('')
  })

  it('should only render NavItem', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mount(
      <NavGroup>
        <div />
      </NavGroup>
    )
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Only NavItem component is allowed inside NavGroup.'))
    spy.mockReset()
  })
})

describe('NavBar Group Extra', () => {
  it('should not display text and items if NavBar is collapsed', () => {
    const navGroup = mount(<NavGroup collapsed />)
    navGroup.setProps({
      children: [<NavItem key="groupitem0" title="GroupItem1" />]
    })
    expect(navGroup.find('.group > .title').text()).toEqual('')
    expect(navGroup.find('.items').props().hidden).toBeTruthy()
  })
})
