import React from 'react'
import { shallow } from 'enzyme'
import ModalLayout from './ModalLayout'

describe('ModalLayout', () => {
  it('renders content', () => {
    const wrapper = shallow(
      <ModalLayout>
        <span>Some</span>
        <p>Text</p>
      </ModalLayout>
    )

    expect(wrapper.find('span').text()).toBe('Some')
    expect(wrapper.find('p').text()).toBe('Text')
  })

  it('renders title', () => {
    const wrapper = shallow(<ModalLayout title="Title">Some content</ModalLayout>)

    expect(wrapper.find('h1').text()).toBe('Title')
  })

  it('renders title (element)', () => {
    const wrapper = shallow(<ModalLayout title={<span>Title</span>}>Some content</ModalLayout>)

    expect(wrapper.find('h1 > span').text()).toBe('Title')
  })

  it('renders actions', () => {
    const wrapper = shallow(<ModalLayout actions={<button>Action</button>}>Some content</ModalLayout>)

    expect(wrapper.find('button').text()).toBe('Action')
  })

  it('renders actions (function)', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <ModalLayout close={spy} actions={close => <button onClick={close}>Action</button>}>
        Some content
      </ModalLayout>
    )

    expect(wrapper.find('button').text()).toBe('Action')
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
