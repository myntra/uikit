import React from 'react'
import { shallow } from 'enzyme'

import { testCodeMod } from '@myntra/codemod-utils'

import Alert from './Alert'

testCodeMod(__dirname, 'Alert.codemod.js')

describe('Alert', () => {
  it('renders', () => {
    const wrapper = shallow(<Alert>Alert</Alert>)

    expect(wrapper.text()).toEqual(expect.stringContaining('Alert'))
  })

  describe('behaviour', () => {
    it('calls `onClose` prop if close button is clicked', () => {
      const handleClose = jest.fn()
      const wrapper = shallow(<Alert onClose={handleClose}>Alert</Alert>)

      wrapper.find('[data-test-id="close"]').simulate('click')

      expect(handleClose).toHaveBeenCalled()
    })
  })
})
