import React from 'react'
import { mount } from 'enzyme'

import Dropdown from './dropdown'

describe('Dropdown', () => {
  it('renders a collapsed dropdown', () => {
    const wrapper = mount(
      <Dropdown trigger="Open" isOpen={false}>
        <p>Some Content</p>
      </Dropdown>
    )
    expect(wrapper.find('[data-test-id="trigger"]')).toHaveText('Open')
    expect(wrapper.find('[data-test-id="content"]')).not.toHaveText('Some Content')
  })

  it('renders an expanded dropdown', () => {
    const wrapper = mount(
      <Dropdown trigger="Open" isOpen={true}>
        <p>Some Content</p>
      </Dropdown>
    )

    expect(wrapper.find('[data-test-id="trigger"]')).toHaveText('Open')
    expect(wrapper.find('[data-test-id="content"]')).toHaveText('Some Content')
  })

  it('renders in DOM', () => {
    const wrapper = mount(
      <Dropdown trigger="Open" isOpen={true}>
        <p>Some Content</p>
      </Dropdown>
    )

    expect(wrapper.find('[data-test-id="trigger"]')).toHaveText('Open')
    expect(wrapper.find('[data-test-id="content"]')).toHaveText('Some Content')
    expect(wrapper.find('[data-test-id="portal"]')).toHaveLength(0)
  })

  it('renders in portal', () => {
    const wrapper = mount(
      <Dropdown trigger="Open" isOpen={true} container>
        <p>Some Content</p>
      </Dropdown>
    )

    expect(wrapper.find('[data-test-id="trigger"]')).toHaveText('Open')
    expect(wrapper.find('[data-test-id="content"]')).toHaveText('Some Content')
    expect(wrapper.find('[data-test-id="portal"]')).toHaveLength(1)
    expect(wrapper.find('[data-test-id="portal"]')).toHaveText('Some Content')
  })

  it('renders with a custom trigger element', () => {
    const wrapper = mount(
      <Dropdown trigger={<span data-test-id="custom-trigger">Trigger</span>} isOpen={true}>
        <p>Some Content</p>
      </Dropdown>
    )

    expect(wrapper.find('[data-test-id="trigger"]')).toHaveText('Trigger')
    expect(wrapper.find('[data-test-id="trigger"] [data-test-id="custom-trigger"]')).toHaveText('Trigger')
  })

  describe('behaviour', () => {
    it('calls `onOpen` prop if trigger is clicked in collapsed state', () => {
      const onOpen = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={false} onOpen={onOpen}>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('click')

      expect(onOpen).toBeCalledTimes(1)
    })

    it('calls `onClose` prop if trigger is clicked in expanded state', () => {
      const onClose = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={true} onClose={onClose}>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('click')

      expect(onClose).toBeCalledTimes(1)
    })

    it('calls `onClose` prop if trigger is clicked in expanded state (in portal)', () => {
      const onClose = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={true} onClose={onClose} container>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('click')

      expect(onClose).toBeCalledTimes(1)
    })

    it('calls `onClose` prop if clicked away from dropdown', () => {
      const onClose = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={true} onClose={onClose}>
          <p>Some Content</p>
        </Dropdown>
      )

      expect(wrapper.find('[data-test-id="click-away"]')).toBeTag('ClickAway')

      wrapper
        .find('[data-test-id="click-away"]')
        .instance()
        .props.onClickAway()

      expect(onClose).toBeCalledTimes(1)
    })

    it('calls `onClose` prop if clicked away from dropdown (in portal)', () => {
      const onClose = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={true} onClose={onClose} container>
          <p>Some Content</p>
        </Dropdown>
      )

      expect(wrapper.find('[data-test-id="click-away"]')).toBeTag('ClickAway')

      wrapper
        .find('[data-test-id="click-away"]')
        .instance()
        .props.onClickAway()

      expect(onClose).toBeCalledTimes(1)
    })
  })

  describe('behaviour on hover trigger', () => {
    it('calls `onOpen` prop if trigger is hovered on collapsed state', () => {
      const onOpen = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={false} onOpen={onOpen} triggerOn={'hover'}>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('mouseenter')

      expect(onOpen).toBeCalledTimes(1)
    })

    it('calls `onClose` prop if hovered away from dropdown', () => {
      const onClose = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={true} onClose={onClose} triggerOn={'hover'}>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('mouseleave')

      expect(onClose).toBeCalledTimes(1)
    })

    it('calls `onClose` prop if hovered away from dropdown (in portal)', () => {
      const onClose = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={true} onClose={onClose} container triggerOn={'hover'}>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('mouseleave')

      expect(onClose).toBeCalledTimes(1)
    })
  })

  describe('behaviour on focus trigger', () => {
    it('calls `onOpen` prop if trigger is focused on collapsed state', () => {
      const onOpen = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={false} onOpen={onOpen} triggerOn={'focus'}>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('focus')

      expect(onOpen).toBeCalledTimes(1)
    })

    it('calls `onClose` prop if focused away from dropdown', () => {
      const onClose = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={true} onClose={onClose} triggerOn={'focus'}>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('blur')

      expect(onClose).toBeCalledTimes(1)
    })

    it('calls `onClose` prop if focused away from dropdown (in portal)', () => {
      const onClose = jest.fn()
      const wrapper = mount(
        <Dropdown trigger="Open" isOpen={true} onClose={onClose} container triggerOn={'focus'}>
          <p>Some Content</p>
        </Dropdown>
      )

      wrapper
        .find('[data-test-id="trigger"]')
        .childAt(0)
        .simulate('blur')

      expect(onClose).toBeCalledTimes(1)
    })
  })

  describe('auto align content', () => {
    const instance = new Dropdown({ auto: true, approxContentWidth: 100, approxContentHeight: 100 })

    const node = (top, left, width, height) => ({
      getBoundingClientRect() {
        return { top, left, right: left + width, bottom: top + height, width, height }
      }
    })

    it('auto: default (no element)', () => {
      expect(instance.calculateAutoPosition(null, node(0, 0, 400, 400))).toEqual({
        left: false,
        up: false,
        right: false
      })
    })

    it('auto: default (no parent)', () => {
      expect(instance.calculateAutoPosition(node(0, 0, 400, 400), null)).toEqual({
        left: false,
        up: false,
        right: false
      })
    })

    it('auto: bottom left', () => {
      expect(instance.calculateAutoPosition(node(100, 100, 100, 100), node(0, 0, 400, 400))).toEqual({
        down: true,
        left: true,
        up: false,
        right: false
      })
    })

    it('auto: bottom right', () => {
      expect(instance.calculateAutoPosition(node(100, 300, 100, 100), node(0, 0, 400, 400))).toEqual({
        down: true,
        left: false,
        up: false,
        right: true
      })
    })

    it('auto: top left', () => {
      expect(instance.calculateAutoPosition(node(300, 100, 100, 100), node(0, 0, 400, 400))).toEqual({
        down: false,
        left: true,
        up: true,
        right: false
      })
    })

    it('auto: top right', () => {
      expect(instance.calculateAutoPosition(node(300, 300, 100, 100), node(0, 0, 400, 400))).toEqual({
        down: false,
        left: false,
        up: true,
        right: true
      })
    })
  })
})
