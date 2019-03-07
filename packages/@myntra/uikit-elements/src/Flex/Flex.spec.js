import React from 'react'
import { shallow } from 'enzyme'
import { testCodeMod } from '@myntra/codemod-utils'

import Flex from './Flex'

testCodeMod(__dirname, 'Flex.codemod.js')

it('should render correct tag', () => {
  expect(shallow(<Flex />).is('div')).toBe(true)
})
