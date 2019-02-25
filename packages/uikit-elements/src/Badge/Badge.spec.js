import React from 'react'
import { shallow } from 'enzyme'
import Badge from './Badge'

describe('Badge', () => {
  it('renders correctly', done => {
    expect(() => shallow(<Badge>Hello</Badge>)).not.toConsoleError()
    done()
  })
})
