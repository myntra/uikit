import React from 'react'
import { mount } from 'enzyme'

import InputHidden from './InputSelectHidden'

describe('Hidden Input values', () => {
  const options = [1, 2]
  const inputHidden = mount(<InputHidden values={options} />)

  it('should render hidden inputs', done => {
    expect(inputHidden.find('input')).toHaveLength(2)
    expect(
      inputHidden
        .find('input')
        .at(0)
        .prop('type')
    ).toBe('hidden')
    expect(
      inputHidden
        .find('input')
        .at(1)
        .prop('type')
    ).toBe('hidden')
    done()
  })

  it('should render passed values as values of hidden inputs', done => {
    expect(
      inputHidden
        .find('input')
        .at(0)
        .prop('value')
    ).toBe('1')
    expect(
      inputHidden
        .find('input')
        .at(1)
        .prop('value')
    ).toBe('2')

    expect(
      inputHidden
        .find('input')
        .at(0)
        .key()
    ).toBe('1')
    expect(
      inputHidden
        .find('input')
        .at(1)
        .key()
    ).toBe('2')
    done()
  })

  it('should not have a name if name is not passed', done => {
    expect(
      inputHidden
        .find('input')
        .at(0)
        .prop('name')
    ).not.toBeDefined()
    done()
  })

  it('should be disabled if disabled prop is passed', done => {
    inputHidden.setProps({ disabled: true })
    expect(
      inputHidden
        .find('input')
        .at(0)
        .prop('disabled')
    ).toBeTruthy()
    done()
  })
})
