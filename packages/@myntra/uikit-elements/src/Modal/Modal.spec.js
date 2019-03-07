import React from 'react'
import { shallow, mount } from 'enzyme'
import Modal from './Modal'

describe('Modal', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Modal isOpen trigger={<button>Trigger</button>} title="Title" actions={<button>Action</button>}>
        <span>Some</span>
        <p>Text</p>
      </Modal>
    )

    expect(wrapper).toMatchSnapshot()
  })
  it('fires open/close events', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()
    const wrapper = mount(
      <Modal trigger="Trigger" onOpen={onOpen} onClose={onClose}>
        <span>Some</span>
        <p>Text</p>
      </Modal>
    )

    expect(wrapper.text()).toBe('Trigger')
    expect(wrapper.find('.modal')).toHaveLength(0)
    expect(onOpen).toHaveBeenCalledTimes(0)
    expect(onClose).toHaveBeenCalledTimes(0)

    wrapper.find('Button').simulate('click')
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(0)
    expect(wrapper.find('.modal')).toHaveLength(1)
    expect(wrapper.find('.modal').text()).toBe('SomeText')

    wrapper.find('.backdrop').simulate('click')
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.modal')).toHaveLength(0)
  })

  it('should not render close button for hideClose prop', () => {
    const wrapper = mount(
      <Modal trigger="Trigger" hideClose>
        <span>Some Text</span>
      </Modal>
    )
    expect(wrapper.find('.close')).toHaveLength(0)
  })
})
