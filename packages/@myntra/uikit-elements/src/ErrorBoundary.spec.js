import React from 'react'
import { mount } from 'enzyme'

import ErrorBoundary from './ErrorBoundary'

const { ExperimentalComponent } = ErrorBoundary

it('should render correct tag', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  expect(
    mount(
      <ErrorBoundary>
        <ExperimentalComponent />
      </ErrorBoundary>
    ).text()
  ).toEqual(expect.stringContaining('Oops!!! Something went wrong'))

  spy.mockRestore()
})
