import React from 'react'
import { shallow } from 'enzyme'

import Promised from './Promised'

function waitInfinite() {
  return new Promise(() => {})
}

it('should render loading state unless resolved', done => {
  const wrapper = shallow(
    <Promised fn={waitInfinite} renderLoading={() => <span>Loading</span>} render={() => <span>Resolved</span>} />
  )

  expect(wrapper.text()).toBe('Loading')
  setTimeout(() => {
    expect(wrapper.text()).toBe('Loading')
    done()
  }, 500)
})

it('should render when resolved', done => {
  shallow(
    <Promised
      fn={() => new Promise(resolve => resolve('Resolved'))}
      render={t => {
        expect(t).toBe('Resolved')
        done()
      }}
    />
  )
})

it('should render error when rejected', done => {
  shallow(
    <Promised
      fn={() => new Promise((resolve, reject) => reject(new Error('Rejected')))}
      renderError={e => {
        expect(e.message).toBe('Rejected')
        done()
      }}
      render={() => null}
    />
  )
})

it('should emit resolve event', done => {
  shallow(
    <Promised fn={() => new Promise(resolve => resolve('onResolve'))} onResolve={() => done()} render={() => null} />
  )
})

it('should emit reject event', done => {
  shallow(
    <Promised
      fn={() => new Promise((resolve, reject) => reject(new Error('onReject')))}
      onReject={() => done()}
      render={() => null}
    />
  )
})

it('should ignore promise if component is unmounted', done => {
  const fn = jest.fn()
  const wrapper = shallow(
    <Promised fn={() => new Promise(resolve => setTimeout(() => resolve(0), 100))} onResolve={fn} render={() => null} />
  )
  wrapper.unmount()

  setTimeout(() => {
    expect(fn).not.toBeCalled()
    done()
  }, 200)
})

it('should cancel promise if fn changes', done => {
  const p1 = () => new Promise(resolve => setTimeout(() => resolve(1), 100))
  const p2 = () => new Promise(resolve => setTimeout(() => resolve(2), 200))

  const wrapper = shallow(
    <Promised
      fn={p1}
      render={id => {
        expect(id).toBe(2)
        done()
      }}
    />
  )

  wrapper.setProps({ fn: p2 })
})

it('should cancel promise if fn changes (reject)', done => {
  const p1 = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 100))
  const p2 = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('2')), 200))

  const wrapper = shallow(
    <Promised
      fn={p1}
      renderError={e => {
        expect(e.message).toBe('2')
        done()
      }}
      render={() => null}
    />
  )

  wrapper.setProps({ fn: p2 })
})
