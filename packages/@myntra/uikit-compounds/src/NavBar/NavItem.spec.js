import React from 'react'
import { mount } from 'enzyme'
import NavItem from './NavItem'

describe('NavBar Item', () => {
  let props
  let mountedNavItem

  const mountNavItem = () => {
    if (!mountedNavItem) {
      mountedNavItem = mount(<NavItem {...props} />)
    }
    return mountedNavItem
  }
  beforeEach(() => {
    props = {
      title: 'Item1',
      icon: 'cross',
      href: 'abc'
    }
    mountedNavItem = undefined
  })

  it('should render list item containing <a> tag', () => {
    const navItem = mountNavItem()
    expect(
      navItem
        .find('li')
        .find('a')
        .find('.item > .title')
        .text()
    ).toEqual('Item1')

    expect(
      navItem
        .find('.item')
        .find('Icon')
        .props().name
    ).toEqual('cross')
  })

  it('should render active item if item href is currentPath', () => {
    const navItem = mountNavItem()
    navItem.setProps({ currentPath: 'abc' })
    expect(navItem.find('.item.active')).toHaveLength(1)
  })

  it('should render call onSelect on item click', () => {
    const navItem = mountNavItem()
    const handleSelect = jest.fn()
    navItem.setProps({ onSelect: handleSelect })
    navItem.find('.item').simulate('click')
    expect(handleSelect).toHaveBeenCalledWith('abc')
  })

  it('should render only icon on collapse', () => {
    const navItem = mountNavItem()
    navItem.setProps({ collapsed: true })
    expect(navItem.find('Icon')).toHaveLength(1)
    expect(navItem.find('.item .title').props().hidden).toBeTruthy()
  })
})

describe('NavBar Menu', () => {
  let props
  let mountedNavMenu
  const Link = props => <a {...props} />

  const mountNavMenu = () => {
    if (!mountedNavMenu) {
      mountedNavMenu = mount(<NavItem {...props} />)
    }
    return mountedNavMenu
  }
  beforeEach(() => {
    props = {
      title: 'Menu1',
      icon: 'cross',
      optionIndex: 2,
      children: [<NavItem key="item-0" title="Item1" icon="alert" href="abc" />]
    }
    mountedNavMenu = undefined
  })

  it('should render a li item of ul', () => {
    const navMenu = mountNavMenu()

    expect(
      navMenu
        .find('li')
        .find('.item')
        .find('Icon')
        .at(0)
        .props().name
    ).toEqual('cross')

    expect(
      navMenu
        .find('li')
        .find('.item')
        .at(0)
        .text()
    ).toEqual('Menu1')

    expect(navMenu.find('li').find('.menu')).toHaveLength(1)
    expect(
      navMenu
        .find('li')
        .find('.menu')
        .props().hidden
    ).toBeTruthy()
  })

  it('should render NavItems on open', () => {
    const navMenu = mountNavMenu()
    const handleSelect = jest.fn()
    navMenu.setProps({
      open: true,
      onSelect: handleSelect,
      currentPath: 'xyz',
      linkComponent: Link
    })

    expect(navMenu.find('.menu').find('NavItem')).toHaveLength(1)

    expect(
      navMenu
        .find('.menu')
        .find('NavItem')
        .props()
    ).toEqual({
      title: 'Item1',
      icon: 'alert',
      href: 'abc',
      onSelect: handleSelect,
      currentPath: 'xyz',
      linkComponent: Link
    })
  })

  it('should be active if it has an active item', () => {
    const navMenu = mountNavMenu()
    navMenu.setProps({
      children: [<NavItem key="item-0" title="Item1" icon="alert" href="abc" />],
      open: true,
      currentPath: 'abc'
    })

    expect(
      navMenu
        .find('.item')
        .first()
        .hasClass('active')
    ).toBeTruthy()
  })

  it('should call onOpen on menu click', () => {
    const navMenu = mountNavMenu()
    const handleOpen = jest.fn()
    navMenu.setProps({
      children: [
        <NavItem key="item0" title="Item1" icon="alert" href="abc" />,
        <NavItem key="item1" title="Item2" icon="chevron-right" href="xyz" />
      ],
      onOpen: handleOpen
    })

    navMenu
      .find('.item')
      .at(0)
      .simulate('click')
    expect(handleOpen).toHaveBeenCalledWith(2)
  })

  it('should display only icon on collapse', () => {
    const navMenu = mountNavMenu()
    navMenu.setProps({
      collapsed: true
    })
    expect(
      navMenu
        .find('.item')
        .at(0)
        .find('Icon')
        .props().name
    ).toEqual('cross')

    expect(
      navMenu
        .find('.title')
        .at(0)
        .props().hidden
    ).toBeTruthy()
    expect(navMenu.find('.menu').props().hidden).toBeTruthy()
  })

  it('should only render NavItem', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mount(
      <NavItem>
        <div />
      </NavItem>
    )
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Only Nav.Item component is allowed inside Nav.Item.'))
    spy.mockReset()
  })
})
