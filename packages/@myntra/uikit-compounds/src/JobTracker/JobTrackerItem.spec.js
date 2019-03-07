import React from 'react'
import { mount, shallow } from 'enzyme'

import JobTrackerItem from './JobTrackerItem'

describe('JobTracker.Item', () => {
  it('renders', () => {
    expect(JobTrackerItem).toBeComponent()
    expect(() => mount(<JobTrackerItem completedStepCount={0} totalStepCount={1} />)).not.toConsoleError()
  })

  it('renders custom description', () => {
    const wrapper = shallow(
      <JobTrackerItem
        completedStepCount={0}
        totalStepCount={1}
        renderRemarks={() => <span data-test-id="stub">Test</span>}
      />
    )

    expect(wrapper.find('[data-test-id="stub"]')).toHaveLength(1)
  })
})
