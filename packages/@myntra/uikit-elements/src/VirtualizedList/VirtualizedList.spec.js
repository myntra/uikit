import React from 'react'
import { shallow } from 'enzyme'
import VirtualizedList from './VirtualizedList'

describe('VirtualizedList', () => {
  it('renders', () => {
    expect(VirtualizedList).toBeComponent()
    expect(() =>
      shallow(<VirtualizedList items={[1, 2, 3]}>{({ index }) => index}</VirtualizedList>)
    ).not.toConsoleError()
  })

  it('readers a sentinel item to measure height', () => {
    const wrapper = shallow(
      <VirtualizedList items={[1, 2, 3, 4, 5]} overScanCount={0}>
        {({ item }) => <div style={{ height: '150px' }}>{item}</div>}
      </VirtualizedList>
    )

    expect(wrapper.find('[data-test-id="sentinel"]')).toHaveLength(1)
    expect(wrapper.find('[data-test-id="sentinel"]').text()).toBe('1')

    wrapper.setState({ scrollTop: 1, visibleHeight: 200, itemHeight: 100 })

    expect(wrapper.find('[data-test-id="sentinel"]')).toHaveLength(0)
  })

  it('readers only visible items', () => {
    const wrapper = shallow(
      <VirtualizedList items={[1, 2, 3, 4, 5]} overScanCount={1}>
        {({ item }) => <div style={{ height: '150px' }}>{item}</div>}
      </VirtualizedList>
    )

    wrapper.setState({ scrollTop: 151, visibleHeight: 400, itemHeight: 150 })

    expect(wrapper.find('[data-test-id="item"]')).toHaveLength(3)
  })
})
