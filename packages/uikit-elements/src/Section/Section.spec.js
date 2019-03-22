import React from 'react'
import { shallow } from 'enzyme'
import Section from './Section'

describe('Section', () => {
  it('renders correctly', done => {
    expect(() => shallow(<Section title="Section">Hello</Section>)).not.toConsoleError()
    done()
  })
})
