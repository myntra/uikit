import React from 'react'
import { mount } from 'enzyme'

import InputValue from './InputSelectValue'

describe('Input Select Value', () => {
  const options = [{ title: 'Idly', value: 1 }]
  const wrapper = mount(<InputValue optionsForValues={options} labelKey={'title'} />)

  it('should render input and close icon', done => {
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').props().value).toBe('Idly')
    expect(wrapper.find('input').props().readOnly).toBeTruthy()

    done()
  })

  it('should be disabled if disabled props is passed', done => {
    wrapper.setProps({ disabled: true })
    expect(wrapper.find('input').props().disabled).toBeTruthy()

    done()
  })

  it('should display value as underlay if underlay props is passed', done => {
    wrapper.setProps({ underlay: true })
    expect(wrapper.find('input').props().value).toBe('Idly')
    expect(wrapper.find('.underlay')).toHaveLength(1)

    done()
  })

  it('should not display any value if options are empty', done => {
    wrapper.setProps({ optionsForValues: [] })
    expect(wrapper.find('input').props().value).toBe('')
    expect(wrapper.find('Icon')).toHaveLength(0)

    done()
  })

  it('should display value + more on more than 1 option', done => {
    wrapper.setProps({ optionsForValues: [{ title: 'Idly', value: 1 }, { title: 'Dosa', value: 1 }] })
    expect(wrapper.find('input').props().value).toBe('Idly, + 1 more')

    done()
  })
})
