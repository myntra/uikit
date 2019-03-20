import React from 'react'
import { mount } from 'enzyme'
import Loader from './Loader'

describe('Loader', () => {
  it('renders inline loader', () => {
    expect(mount(<Loader />)).toMatchSnapshot()
  })
})
