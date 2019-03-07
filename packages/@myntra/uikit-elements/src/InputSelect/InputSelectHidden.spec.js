import React from 'react'
import { mount } from 'enzyme'

import InputHidden from './InputSelectHidden'

it('should render select element', () => {
  const options = [1, 2]
  const inputHidden = mount(<InputHidden values={options} />)

  expect(inputHidden).toMatchSnapshot()
})
