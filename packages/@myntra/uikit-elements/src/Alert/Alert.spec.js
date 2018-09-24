import React from 'react'
import { shallow } from 'enzyme'

import { testCodeMod } from '@myntra/codemod-utils'

import Alert from './Alert'

testCodeMod(__dirname, 'Alert.codemod.js')

describe('Alert', () => {
  it('renders', () => {
    expect(shallow(<Alert>Alert</Alert>)).toMatchSnapshot()
  })
  it('triggers close event on cross click', () => {
    const handleClose = jest.fn()
    const wrapper = shallow(<Alert onClose={handleClose}>Alert</Alert>)
    wrapper.find('.close').simulate('click')
    expect(handleClose).toHaveBeenCalled()
  })
  it('renders unfilled alert', () => {
    const wrapper = shallow(<Alert noFill>Alert</Alert>)
    expect(wrapper.hasClass('no-fill')).toBe(true)
  })
})
