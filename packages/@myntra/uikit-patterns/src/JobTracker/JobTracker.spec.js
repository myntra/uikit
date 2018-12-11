import React from 'react'
import { mount, shallow } from 'enzyme'
import JobTracker from './JobTracker'

describe('JobTracker', () => {
  let id = 0
  function createJobProps(overrides = {}) {
    return {
      id: ++id,
      createdBy: 'Ash Ketchum',
      remarks: "Gotta catch 'em all",
      createdOn: 1542623683000,
      successFileName: 'success.xslx',
      errorFileName: 'error.xslx',
      status: 'IN_PROGRESS',
      completedStepCount: 30,
      totalStepCount: 100,
      ...overrides
    }
  }

  beforeEach(() => (id = 0))

  it('renders', () => {
    expect(() => mount(<JobTracker data={[]} />)).not.toConsoleError()
  })

  it('renders items grouped by date', () => {
    const data = [
      createJobProps({ createdOn: new Date('2018-12-01T12:00:00Z').getTime() }),
      createJobProps({ createdOn: new Date('2018-12-01T15:00:00Z').getTime() }),
      createJobProps({ createdOn: new Date('2018-12-02T12:00:00Z').getTime() })
    ]

    const wrapper = shallow(<JobTracker data={data} />)
    const groups = wrapper.find('[data-test-id="group"]')

    expect(groups).toHaveLength(2)
    expect(wrapper.find('[data-test-id="group-item"]')).toHaveLength(3)

    expect(
      groups
        .at(0)
        .find('[data-test-id="date"]')
        .text()
    ).toBe('01 Dec, 2018')
    expect(groups.at(0).find('[data-test-id="group-item"]')).toHaveLength(2)
    expect(
      groups
        .at(1)
        .find('[data-test-id="date"]')
        .text()
    ).toBe('02 Dec, 2018')
    expect(groups.at(1).find('[data-test-id="group-item"]')).toHaveLength(1)
  })
})
