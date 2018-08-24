import React from 'react'
import { mount } from 'enzyme'
import Form from './Form'

describe('Form component', () => {
  let mountedForm, props
  const mountForm = () => {
    if (!mountedForm) {
      mountedForm = mount(<Form onSubmit={() => {}} {...props} />)
    }
    return mountedForm
  }
  beforeEach(() => {
    mountedForm = undefined
    props = {
      id: 'basicForm',
      title: 'Basic Form'
    }
  })

  it('should render <form> tag', () => {
    const form = mountForm()
    expect(form.find('form')).toHaveLength(1)
    expect(form.find('form').props().id).toEqual('basicForm')
    expect(
      form
        .find('form')
        .find('.form-title')
        .text()
    ).toEqual('Basic Form')
  })

  it('should fire submit event', () => {
    const spy = jest.fn()
    props = {
      ...props,
      onSubmit: spy,
      children: [
        <Form.Action type="primary" key="0">
          submit
        </Form.Action>
      ]
    }

    const form = mountForm()

    form.find('form').simulate('submit')

    expect(spy).toHaveBeenCalled()
  })

  it('should throw error if form has more than one primary action', () => {
    props = { ...props, children: [<Form.Action key="0" type="primary" />, <Form.Action key="1" type="primary" />] }
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mountForm()
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('Form should contain only one primary action.'))
    spy.mockReset()
  })

  it('should render form group elements in a grid, followed by actions', () => {
    props = {
      ...props,
      children: [
        <Form.Text key="name" label="Name" />,
        <Form.Action key="primary" type="primary" />,
        <Form.Action key="secondary" type="secondary" />,
        <Form.Select key="nation" label="Nationality" options={[]} onChange={jest.fn()} />
      ]
    }
    const form = mountForm()
    expect(
      form
        .find('form')
        .find('Grid')
        .props().multiline
    ).toBeTruthy()
    expect(
      form
        .find('form')
        .find('Grid')
        .find('GridColumn')
    ).toHaveLength(2)

    expect(
      form
        .find('form')
        .find('Grid')
        .find('FormGroup')
    ).toHaveLength(2)

    expect(form.find('.form-actions').find('Button')).toHaveLength(2)
    expect(
      form
        .find('.form-actions')
        .find('Button')
        .at(0)
        .props().htmlType
    ).toEqual('submit')
  })
})
