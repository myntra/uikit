import React from 'react'
import { mount } from 'enzyme'
import NavBar from './NavBar'
import NavItem from './NavItem'

describe('NavBar Component', () => {
  let props
  let mountedNavBar

  const mountNavBar = () => {
    if (!mountedNavBar) {
      mountedNavBar = mount(<NavBar {...props} />)
    }
    return mountedNavBar
  }
  beforeEach(() => {
    props = {
      title: 'Myntra Jabong',
      icon: 'alert',
      currentPath: 'abc'
    }
    mountedNavBar = undefined
  })

  it('should render title and icon', () => {
    const navBar = mountNavBar()
    expect(
      navBar
        .find('nav')
        .find('.title .content')
        .text()
    ).toEqual('Myntra Jabong')

    expect(
      navBar
        .find('nav')
        .find('.title')
        .find('Icon')
        .props().name
    ).toEqual('alert')
  })

  it('should expand on mouseenter', () => {
    const navBar = mountNavBar()
    expect(navBar.state('collapsed')).toBeTruthy()
    navBar.find('.nav').simulate('mouseenter')
    expect(navBar.state('collapsed')).toBeFalsy()
  })

  it('should collapse on mouseleave', () => {
    const navBar = mountNavBar()
    navBar.setState({ collapsed: false })
    navBar.find('.nav').simulate('mouseleave')
    expect(navBar.state('collapsed')).toBeTruthy()
  })

  it('should render child items with extra props', () => {
    const navBar = mountNavBar()
    navBar.setProps({
      children: [<NavItem key="item0" icon="cross" href="xyz" title="Item1" />]
    })

    expect(navBar.find('.menu').find('NavItem')).toHaveLength(1)
    expect(navBar.find('NavItem').props().optionIndex).toEqual(0)
    expect(navBar.find('NavItem').props().open).toBeFalsy()
    expect(navBar.find('NavItem').props().currentPath).toEqual('abc')
    expect(navBar.find('NavItem').props().collapsed).toBeTruthy()
  })

  it('should expand menu on Menu click', () => {
    const navBar = mountNavBar()
    navBar.setProps({
      children: [
        <NavItem key="menu0" icon="cross" title="Menu1">
          {[<NavItem key="item0" icon="cross" href="xyz" title="Item1" />]}
        </NavItem>
      ]
    })
    navBar
      .find('NavItem')
      .at(0)
      .find('.item')
      .at(0)
      .simulate('click')
    expect(navBar.state('expandedMenu')).toEqual(0)
  })

  it('should collapse menu on click on expanded Menu', () => {
    const navBar = mountNavBar()
    navBar.setProps({
      children: [
        <NavItem key="menu0" icon="cross" title="Menu1">
          {[<NavItem key="item0" icon="cross" href="xyz" title="Item1" />]}
        </NavItem>
      ]
    })
    navBar.setState({ expandedMenu: 0 })
    navBar
      .find('NavItem')
      .at(0)
      .find('.item')
      .at(0)
      .simulate('click')
    expect(navBar.state('expandedMenu')).toEqual(-1)
  })

  it('should trigger onChange handler on option select', () => {
    const navBar = mountNavBar()
    const handleChange = jest.fn()
    navBar.setProps({
      children: [<NavItem key="item0" icon="cross" href="xyz" title="Item1" />],
      onChange: handleChange
    })
    navBar
      .find('NavItem')
      .find('.item')
      .simulate('click')
    expect(handleChange).toHaveBeenCalledWith({ href: 'xyz' })
  })

  it('should expand on click if expand prop is open/close', () => {
    const navBar = mountNavBar()
    const handleClick = jest.fn()
    navBar.setProps({
      children: [<NavItem key="item0" icon="cross" href="xyz" title="Item1" />],
      expand: 'open',
      onClick: handleClick
    })
    expect(navBar.state('collapsed')).toBeFalsy()
    navBar.find('.nav').simulate('click')
    expect(handleClick).toHaveBeenLastCalledWith({ expand: 'close' })

    navBar.setProps({ expand: 'close' })
    expect(navBar.state('collapsed')).toBeTruthy()
    navBar.find('.nav').simulate('click')
    expect(handleClick).toHaveBeenLastCalledWith({ expand: 'open' })
  })
})
