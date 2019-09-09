import React from 'react'
import { shallow } from 'enzyme'
import ButtonGroup from './button-group'
import Button from '@myntra/uikit-component-button'
import List from '@myntra/uikit-component-list'

describe('ButtonGroup', () => {
  it('renders a ButtonGroup', () => {
    expect(ButtonGroup).toBeComponent()
  })

  it('should render only buttons for group of less then 3 buttons', () => {
    let wrapper = shallow(
      <ButtonGroup>
        <Button type="primary">primary</Button>
        <Button type="secondary">secondary</Button>
        <Button type="link">link</Button>
      </ButtonGroup>
    )
    expect(wrapper.find(List).exists()).toEqual(false)

    wrapper = shallow(
      <ButtonGroup>
        <Button type="primary">primary</Button>
        <Button type="secondary">secondary</Button>
      </ButtonGroup>
    )
    expect(wrapper.find(List).exists()).toEqual(false)
  })

  it('should render buttons and a more button for group of more then 3 buttons', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button type="primary">primary</Button>
        <Button type="secondary">secondary</Button>
        <Button type="primary">primary</Button>
        <Button type="secondary">secondary</Button>
      </ButtonGroup>
    )
    expect(wrapper.find(List).exists()).toEqual(true)
  })

  it('should render the next valid button in case of repeated buttons', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button type="secondary">secondary</Button>
        <Button type="secondary">second secondary</Button>
      </ButtonGroup>
    )

    expect(wrapper.find({ type: 'secondary' })).toHaveLength(1)
    expect(wrapper.find({ type: 'text' })).toHaveLength(1)
  })

  it('should throw an error in case of repeated link buttons', () => {
    try {
      shallow(
        <ButtonGroup>
          <Button type="link">link</Button>
          <Button type="link">second link</Button>
        </ButtonGroup>
      )
    } catch (e) {
      expect(e.message).toEqual('Not a correct sequence')
    }
  })

  it('should render secondary button in case of no type prop defined', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>secondary</Button>
        <Button>second secondary</Button>
      </ButtonGroup>
    )
    expect(wrapper.find(Button)).toHaveLength(2)
    expect(wrapper.find({ type: 'secondary' })).toHaveLength(1)
    expect(wrapper.find({ type: 'text' })).toHaveLength(1)
  })

  it('should follow the button sequence link -> secondary -> primary', () => {
    let wrapper = shallow(
      <ButtonGroup>
        <Button type="primary">primary</Button>
        <Button type="secondary">secondary</Button>
        <Button type="link">link</Button>
      </ButtonGroup>
    )
    expect(wrapper.find(Button).get(0).props.type).toEqual('link')
    expect(wrapper.find(Button).get(1).props.type).toEqual('secondary')
    expect(wrapper.find(Button).get(2).props.type).toEqual('primary')

    wrapper = shallow(
      <ButtonGroup>
        <Button type="primary">primary</Button>
        <Button type="link">link</Button>
        <Button type="secondary">secondary</Button>
        <Button type="secondary">secondary</Button>
      </ButtonGroup>
    )

    expect(wrapper.find(Button).get(0).props.type).toEqual('link')
    expect(wrapper.find(Button).get(1).props.type).toEqual('primary')
    expect(wrapper.find(Button).get(2)).toEqual(undefined) // All buttons after link type goes in more buttons
  })
})
