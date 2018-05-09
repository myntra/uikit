import React from 'react'
import { mount } from 'enzyme'

import ErrorBoundary from './ErrorBoundary'

const { ExperimentalComponent } = ErrorBoundary

it('should capture error', () => {
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

it('should render custom message on error', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  expect(
    mount(
      <ErrorBoundary message="It's broken.">
        <ExperimentalComponent />
      </ErrorBoundary>
    ).text()
  ).toEqual(expect.stringContaining("It's broken."))

  spy.mockRestore()
})

it('should render custom component on error', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  expect(
    mount(
      <ErrorBoundary renderMessage={() => <span>{"It's broken."}</span>}>
        <ExperimentalComponent />
      </ErrorBoundary>
    ).text()
  ).toEqual(expect.stringContaining("It's broken."))

  spy.mockRestore()
})
